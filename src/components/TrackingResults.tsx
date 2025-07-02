
import { Package, Truck, MapPin, Route, Clock, Check, Phone, Mail, Download, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface TrackingResultsProps {
  trackingNumber: string;
}

const TrackingResults = ({ trackingNumber }: TrackingResultsProps) => {
  // Mock tracking data - in a real app, this would come from an API
  const trackingData = {
    id: trackingNumber,
    status: 'In Transit',
    estimatedDelivery: 'Tomorrow by 6:00 PM',
    currentLocation: 'Distribution Center - New York, NY',
    recipient: 'John Doe',
    service: 'Express Delivery',
    weight: '2.5 lbs',
    dimensions: '12" x 8" x 4"',
    timeline: [
      {
        status: 'Package Delivered',
        location: 'New York, NY 10001',
        time: 'Expected Tomorrow 6:00 PM',
        icon: Package,
        completed: false,
        current: false,
        description: 'Package will be delivered to your doorstep'
      },
      {
        status: 'Out for Delivery',
        location: 'Local Facility - New York, NY',
        time: 'Tomorrow 8:00 AM',
        icon: Truck,
        completed: false,
        current: false,
        description: 'Package loaded onto delivery vehicle'
      },
      {
        status: 'In Transit',
        location: 'Distribution Center - New York, NY',
        time: 'Today 2:15 PM',
        icon: Route,
        completed: true,
        current: true,
        description: 'Package is being processed for next delivery step'
      },
      {
        status: 'Package Shipped',
        location: 'Origin Facility - Los Angeles, CA',
        time: 'Yesterday 11:30 AM',
        icon: MapPin,
        completed: true,
        current: false,
        description: 'Package picked up and entered into our system'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'in transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'out for delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Check if package is delivered
  const isDelivered = trackingData.status.toLowerCase() === 'delivered' || 
                     trackingData.timeline.some(event => event.status.toLowerCase() === 'package delivered' && event.completed);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Tracking Details</h2>
            <p className="text-gray-600">
              Tracking ID: <span className="font-mono font-semibold text-blue-600">{trackingNumber}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Delivery Success Image - Show when package is delivered */}
      {isDelivered && (
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&crop=center" 
                    alt="Package delivered successfully"
                    className="w-48 h-36 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-3 shadow-lg">
                    <Check className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-green-800">Package Delivered Successfully!</h3>
                  <p className="text-green-700">Your package has been delivered to the destination address.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Tracking Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Status Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">Current Status</span>
                <Badge className={`${getStatusColor(trackingData.status)} border text-sm font-semibold px-3 py-1`}>
                  {trackingData.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <p className="text-sm font-medium text-gray-600">Estimated Delivery</p>
                  </div>
                  <p className="text-xl font-bold text-green-600">{trackingData.estimatedDelivery}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <p className="text-sm font-medium text-gray-600">Current Location</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{trackingData.currentLocation}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Delivery Timeline</CardTitle>
              <p className="text-gray-600">Real-time tracking updates</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {trackingData.timeline.map((event, index) => {
                  const IconComponent = event.icon;
                  return (
                    <div key={index} className="relative flex items-start space-x-6">
                      {/* Timeline line */}
                      {index !== trackingData.timeline.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        event.current 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                          : event.completed 
                            ? 'bg-green-600 border-green-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {event.completed && !event.current ? (
                          <Check className="h-6 w-6" />
                        ) : (
                          <IconComponent className="h-6 w-6" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            event.current ? 'text-blue-600' : event.completed ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {event.status}
                          </h3>
                          <span className={`text-sm font-medium ${
                            event.current ? 'text-blue-600' : event.completed ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {event.time}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium mb-1">{event.location}</p>
                        <p className="text-sm text-gray-500">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Package Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Package className="h-5 w-5 mr-2 text-blue-600" />
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recipient</p>
                  <p className="text-base font-semibold text-gray-900">{trackingData.recipient}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-600">Service Type</p>
                  <p className="text-base font-semibold text-gray-900">{trackingData.service}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Weight</p>
                    <p className="text-base font-semibold text-gray-900">{trackingData.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dimensions</p>
                    <p className="text-base font-semibold text-gray-900">{trackingData.dimensions}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Need Help?</CardTitle>
              <p className="text-sm text-gray-600">Our support team is here to assist you</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
              <Button variant="outline" className="w-full rounded-xl border-blue-200 hover:bg-blue-50">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">Available 24/7</p>
                <p className="text-sm font-semibold text-blue-600">1-800-SWIFT-01</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-gray-50">
                <Package className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-gray-50">
                <Route className="h-4 w-4 mr-2" />
                Change Delivery Address
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-gray-50">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Delivery
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackingResults;
