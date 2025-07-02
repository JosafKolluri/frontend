
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!stripeSecretKey || !webhookSecret) {
      throw new Error('Stripe configuration missing')
    }

    const stripe = await import('https://esm.sh/stripe@14.21.0')
    const stripeClient = new stripe.default(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    let event
    try {
      event = stripeClient.webhooks.constructEvent(body, signature!, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return new Response('Webhook Error', { status: 400 })
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const shipmentId = session.metadata?.shipment_id
      const invoiceId = session.metadata?.invoice_id

      if (shipmentId) {
        // Update payment status to completed
        await supabaseClient
          .from('shipments')
          .update({ payment_status: 'completed' })
          .eq('id', shipmentId)

        console.log(`Payment completed for shipment: ${shipmentId}`)
      }

      if (invoiceId) {
        // Update invoice status to paid
        await supabaseClient
          .from('invoices')
          .update({ status: 'paid' })
          .eq('id', invoiceId)

        console.log(`Invoice marked as paid: ${invoiceId}`)
      }
    }

    return new Response('ok', { headers: corsHeaders })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Webhook Error', { status: 500 })
  }
})
