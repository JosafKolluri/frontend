
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trackingNumber, setTrackingNumber] = useState<string>('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // In a real implementation, you might verify the session with your backend
      // For now, we'll show a success message
      const storedTrackingNumber = localStorage.getItem('lastTrackingNumber');
      if (storedTrackingNumber) {
        setTrackingNumber(storedTrackingNumber);
        localStorage.removeItem('lastTrackingNumber');
      }
      
      toast({
        title: "Payment Successful!",
        description: "Your shipment has been booked successfully.",
        duration: 5000,
      });
    } else {
      navigate('/services');
    }
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-gray-600 mb-4">
                Your payment has been processed successfully and your shipment has been booked.
              </p>
              {trackingNumber && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Tracking Number</p>
                  <p className="text-lg font-bold text-blue-800">{trackingNumber}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')} 
                className="w-full"
              >
                <Package className="h-4 w-4 mr-2" />
                Track Your Shipment
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/services')} 
                className="w-full"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Book Another Shipment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
