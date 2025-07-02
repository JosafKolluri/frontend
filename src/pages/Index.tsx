import { useState } from 'react';
import { Search, ArrowRight, Package, Globe, Clock, Shield, Truck, Route, Star, Handshake, Building, Award } from 'lucide-react';
import Header from '@/components/Header';
import TrackingResults from '@/components/TrackingResults';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
const DEMO_TRACKING = "ST123456789";
const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [searching, setSearching] = useState(false);
  const handleTrack = (number: string) => {
    setTrackingNumber(number);
  };
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearching(true);
      setTimeout(() => {
        handleTrack(inputValue.trim());
        setSearching(false);
      }, 800);
    }
  };
  const handleNewSearch = () => {
    setTrackingNumber(null);
    setInputValue('');
  };
  const stats = [{
    number: "50M+",
    label: "Packages Delivered",
    icon: Package
  }, {
    number: "200+",
    label: "Cities Covered",
    icon: Globe
  }, {
    number: "99.9%",
    label: "On-Time Delivery",
    icon: Clock
  }, {
    number: "24/7",
    label: "Customer Support",
    icon: Shield
  }];
  const services = [{
    title: "Express Delivery",
    description: "Same-day and next-day delivery options",
    icon: Truck,
    color: "bg-blue-500"
  }, {
    title: "International Shipping",
    description: "Worldwide delivery with customs clearance",
    icon: Globe,
    color: "bg-green-500"
  }, {
    title: "Bulk Logistics",
    description: "Corporate and bulk shipping solutions",
    icon: Package,
    color: "bg-purple-500"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      {!trackingNumber ? <>
          <HeroSection searching={searching} inputValue={inputValue} setInputValue={setInputValue} onSubmit={handleHeroSubmit} />
          {/* Stats Section */}
          <section className="py-16 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => <div key={index} className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-blue-50 rounded-2xl">
                        <stat.icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>)}
              </div>
            </div>
          </section>

          {/* --- Moved "About Us" Section Above Services --- */}
          <section className="relative py-20 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="absolute left-0 top-24 w-28 h-28 bg-blue-100 rounded-full blur-2xl opacity-50 -z-10" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-400 text-white">
                  About Arudhra
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Delivering Trust, Speed, and Excellence
                </h2>
                <p className="text-lg max-w-2xl mx-auto text-gray-600">
                  At Arudhra, we are committed to transforming logistics through reliability, technology, and unparalleled customer care. With a global presence and a passion for connecting people and businesses, we provide efficient, secure, and responsive courier services tailored to your needs.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-blue-600 p-4 rounded-2xl mb-2">
                    <Award className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-lg text-gray-900">Professionalism You Can Trust</h4>
                  <p className="text-gray-500 text-sm">
                    Our team is dedicated to punctual, precise, and secure handling of every shipment, every step of the journey.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-indigo-600 p-4 rounded-2xl mb-2">
                    <Globe className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-lg text-gray-900">Global Reach, Local Expertise</h4>
                  <p className="text-gray-500 text-sm">
                    From local express delivery to worldwide shipping, we blend global reach with local expertise for seamless solutions.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-green-600 p-4 rounded-2xl mb-2">
                    <Handshake className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-lg text-gray-900">Customer-First Philosophy</h4>
                  <p className="text-gray-500 text-sm">
                    Your satisfaction drives us. Expect proactive support, real-time updates, and a partnership built on excellence.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* --- End About Us Section --- */}

          {/* Services Preview */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 space-y-4">
                <Badge variant="secondary" className="mb-4">Our Services</Badge>
                <h2 className="text-4xl font-bold text-gray-900">
                  Comprehensive Logistics Solutions
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From express delivery to international shipping, we provide end-to-end 
                  logistics solutions tailored to your needs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="flex justify-center">
                        <div className={`p-4 ${service.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                      <Button variant="ghost" className="group-hover:bg-blue-50 group-hover:text-blue-600">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </section>

          {/* Enhanced Why Choose SwiftTrack Section */}
          <WhyChooseSection />

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-white">Ready to Ship with Arudhra Logistics?</h2>
                <p className="text-xl text-blue-100">
                  Join millions of satisfied customers who trust us with their deliveries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </> : <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button onClick={handleNewSearch} variant="ghost" className="text-blue-600 hover:text-blue-700 font-medium mb-4">
              ← Track Another Package
            </Button>
          </div>
          <TrackingResults trackingNumber={trackingNumber} />
        </div>}
      
      <Footer />
    </div>;
};
export default Index;