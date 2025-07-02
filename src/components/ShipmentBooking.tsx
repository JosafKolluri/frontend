
import { useState } from 'react';
import { Package, MapPin, Weight, Clock, Calculator, CreditCard, User, Phone, FileText, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const ShipmentBooking = () => {
  const { toast } = useToast();
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    senderPincode: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientPincode: '',
    weight: '',
    serviceType: '',
    packageDescription: '',
    declaredValue: ''
  });
  const [calculatedRate, setCalculatedRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateRate = () => {
    const weight = parseFloat(formData.weight);
    const distance = Math.abs(parseInt(formData.senderPincode) - parseInt(formData.recipientPincode));
    let baseRate = 50;
    
    // Weight-based pricing
    if (weight <= 0.5) baseRate = 50;
    else if (weight <= 1) baseRate = 75;
    else if (weight <= 2) baseRate = 100;
    else baseRate = 100 + (weight - 2) * 25;
    
    // Distance factor
    const distanceFactor = Math.min(distance / 100000, 2);
    
    // Service type multiplier
    const serviceMultiplier = formData.serviceType === 'express' ? 1.5 : 
                             formData.serviceType === 'same-day' ? 2.5 : 1;
    
    const finalRate = Math.round(baseRate * (1 + distanceFactor) * serviceMultiplier);
    setCalculatedRate(finalRate);
  };

  const handlePayment = async () => {
    if (!user || !session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a shipment.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!calculatedRate) {
      toast({
        title: "Calculate Rate First",
        description: "Please calculate the shipping rate before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          shipmentData: {
            ...formData,
            amount: calculatedRate
          }
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      // Store tracking number for success page
      if (data.tracking_number) {
        localStorage.setItem('lastTrackingNumber', data.tracking_number);
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Require authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <Package className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please log in to book a shipment.</p>
            <Button onClick={() => navigate('/login')} size="lg" className="w-full">
              Log In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Shipment</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill in the details below to book your shipment and get instant pricing
          </p>
        </div>

        {/* Rate Calculator Card */}
        <Card className="mb-8 bg-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Get Instant Rate</h3>
                  <p className="text-sm text-gray-600">Calculate shipping cost based on your requirements</p>
                </div>
              </div>
              <Button 
                onClick={calculateRate} 
                disabled={!formData.weight || !formData.senderPincode || !formData.recipientPincode || !formData.serviceType}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Rate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rate Display */}
        {calculatedRate && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-8 w-8 text-green-600 mr-2" />
                  <span className="text-3xl font-bold text-green-800">₹{calculatedRate}</span>
                </div>
                <p className="text-green-700 font-medium">Estimated Shipping Cost</p>
                <p className="text-sm text-green-600 mt-1">*Final rate may vary based on actual package dimensions</p>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sender Details */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Sender Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    placeholder="Enter sender's full name"
                    value={formData.senderName}
                    onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input
                    placeholder="Enter 10-digit phone number"
                    value={formData.senderPhone}
                    onChange={(e) => setFormData({...formData, senderPhone: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Complete Address</label>
                  <Textarea
                    placeholder="House/Office number, Street, Area, City, State"
                    value={formData.senderAddress}
                    onChange={(e) => setFormData({...formData, senderAddress: e.target.value})}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pincode</label>
                  <Input
                    placeholder="6-digit pincode"
                    value={formData.senderPincode}
                    onChange={(e) => setFormData({...formData, senderPincode: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recipient Details */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  Recipient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    placeholder="Enter recipient's full name"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input
                    placeholder="Enter 10-digit phone number"
                    value={formData.recipientPhone}
                    onChange={(e) => setFormData({...formData, recipientPhone: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Complete Address</label>
                  <Textarea
                    placeholder="House/Office number, Street, Area, City, State"
                    value={formData.recipientAddress}
                    onChange={(e) => setFormData({...formData, recipientAddress: e.target.value})}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pincode</label>
                  <Input
                    placeholder="6-digit pincode"
                    value={formData.recipientPincode}
                    onChange={(e) => setFormData({...formData, recipientPincode: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Package Details */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Weight className="h-4 w-4 mr-2 text-gray-500" />
                    Weight (kg)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="0.5"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Service Type
                  </label>
                  <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose delivery speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Delivery (3-5 days)</SelectItem>
                      <SelectItem value="express">Express Delivery (1-2 days)</SelectItem>
                      <SelectItem value="same-day">Same Day Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    Declared Value (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={formData.declaredValue}
                    onChange={(e) => setFormData({...formData, declaredValue: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  Package Description
                </label>
                <Textarea
                  placeholder="Describe your package contents (e.g., Documents, Electronics, Clothing, etc.)"
                  value={formData.packageDescription}
                  onChange={(e) => setFormData({...formData, packageDescription: e.target.value})}
                  required
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-0">
            <CardContent className="p-6">
              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg" 
                disabled={!calculatedRate || loading}
              >
                {loading ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay Now - ₹{calculatedRate || 0}
                  </>
                )}
              </Button>
              {calculatedRate && (
                <p className="text-center text-blue-100 text-sm mt-3">
                  Secure payment powered by Stripe • Your payment information is encrypted and secure
                </p>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ShipmentBooking;
