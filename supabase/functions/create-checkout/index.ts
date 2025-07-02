
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')

    // Verify the user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    const { shipmentData } = await req.json()

    // Generate tracking number
    const trackingNumber = 'ST' + Date.now().toString().slice(-8)

    // Insert shipment data into database
    const { data: shipment, error: insertError } = await supabaseClient
      .from('shipments')
      .insert({
        user_id: user.id,
        tracking_number: trackingNumber,
        sender_name: shipmentData.senderName,
        sender_phone: shipmentData.senderPhone,
        sender_address: shipmentData.senderAddress,
        sender_pincode: shipmentData.senderPincode,
        recipient_name: shipmentData.recipientName,
        recipient_phone: shipmentData.recipientPhone,
        recipient_address: shipmentData.recipientAddress,
        recipient_pincode: shipmentData.recipientPincode,
        weight: parseFloat(shipmentData.weight),
        service_type: shipmentData.serviceType,
        package_description: shipmentData.packageDescription,
        declared_value: parseFloat(shipmentData.declaredValue),
        amount: shipmentData.amount,
        payment_status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    // Generate invoice number
    const invoiceNumber = 'INV-' + Date.now().toString()

    // Calculate tax (18% GST for India)
    const subtotal = shipmentData.amount
    const taxAmount = Math.round(subtotal * 0.18)
    const totalAmount = subtotal + taxAmount

    // Create invoice record
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('invoices')
      .insert({
        user_id: user.id,
        shipment_id: shipment.id,
        invoice_number: invoiceNumber,
        subtotal: subtotal,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        status: 'pending'
      })
      .select()
      .single()

    if (invoiceError) {
      console.error('Invoice creation error:', invoiceError)
      // Don't fail the entire process if invoice creation fails
    }

    // Create Stripe checkout session
    const stripe = await import('https://esm.sh/stripe@14.21.0')
    const stripeClient = new stripe.default(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${shipmentData.serviceType.charAt(0).toUpperCase() + shipmentData.serviceType.slice(1)} Courier Service`,
              description: `From ${shipmentData.senderPincode} to ${shipmentData.recipientPincode} - ${shipmentData.weight}kg`,
            },
            unit_amount: Math.round(totalAmount * 100), // Convert to paise and use total amount including tax
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/services`,
      metadata: {
        shipment_id: shipment.id,
        tracking_number: trackingNumber,
        invoice_id: invoice?.id || '',
      },
    })

    // Update shipment with stripe session ID
    await supabaseClient
      .from('shipments')
      .update({ stripe_session_id: session.id })
      .eq('id', shipment.id)

    return new Response(
      JSON.stringify({ 
        url: session.url, 
        tracking_number: trackingNumber,
        invoice_number: invoiceNumber
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
