import { Truck, Package, Globe, Clock, Shield, Zap, Users, ArrowRight, CheckCircle, MapPin, Calendar, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const Services = () => {
  const mainServices = [{
    title: "Express Delivery",
    description: "Same-day and next-day delivery for urgent shipments",
    icon: Zap,
    color: "bg-orange-500",
    features: ["Same-day delivery", "Real-time tracking", "Priority handling", "SMS notifications"],
    price: "Starting from ₹99"
  }, {
    title: "Van Freight",
    description: "Reliable delivery within 2-5 business days",
    icon: Truck,
    color: "bg-blue-500",
    features: ["2-5 day delivery", "Secure packaging", "Insurance included", "Proof of delivery"],
    price: "Starting from ₹49"
  }, {
    title: "Rail Frieght",
    description: "We delivery with train shipping",
    icon: Globe,
    color: "bg-green-500",
    features: ["Global coverage", "Customs handling", "Door-to-door service", "Multi-language support"],
    price: "Starting from ₹299"
  }, {
    title: "Road Frieght",
    description: "Enterprise solutions for high-volume shipping",
    icon: Package,
    color: "bg-purple-500",
    features: ["Volume discounts", "Dedicated support", "API integration", "Analytics dashboard"],
    price: "Custom pricing"
  }];
  const specializedServices = [{
    title: "Cold Chain",
    description: "Temperature-controlled shipping for pharmaceuticals and food",
    icon: Shield,
    features: ["Temperature monitoring", "Pharmaceutical compliance", "Fresh food delivery"]
  }, {
    title: "Heavy Freight",
    description: "Industrial and heavy machinery transportation",
    icon: Truck,
    features: ["Heavy equipment", "Industrial machinery", "Construction materials"]
  }, {
    title: "Document Courier",
    description: "Secure and fast document delivery services",
    icon: Users,
    features: ["Legal documents", "Confidential papers", "Same-day service"]
  }];
  const benefits = [{
    icon: Clock,
    title: "Fast Delivery",
    description: "Express options available with same-day delivery in major cities"
  }, {
    icon: Shield,
    title: "Secure & Insured",
    description: "All packages are insured and handled with maximum security"
  }, {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Serving 200+ cities across India and 180+ countries worldwide"
  }, {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Schedule pickups and deliveries at your convenience"
  }];
  return ( <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-white/20 text-white border-white/30">
              Comprehensive Logistics Solutions
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              From express delivery to international shipping, we offer a complete range 
              of courier and logistics services to meet all your shipping needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of delivery options designed to meet every shipping requirement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 ${service.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>)}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      
                    </div>
                    <button className={`
                        relative
                        flex items-center gap-2
                        px-8 py-3
                        rounded-xl
                        bg-gradient-to-r from-blue-600 to-indigo-700
                        text-white
                        font-semibold
                        shadow-md
                        transition-all duration-200
                        hover:from-blue-700 hover:to-indigo-900
                        hover:shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-400
                        overflow-hidden
                        group
                      `}>
                      <span className="relative z-10 flex items-center">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                      </span>

                      {/* shine effect */}
                      <span className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{
                    background: "linear-gradient(120deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.32) 55%,rgba(255,255,255,0.08) 100%)",
                    opacity: 0.55,
                    mixBlendMode: "lighten",
                    transition: "opacity 0.2s",
                    animation: "shineGradientBtn 2.2s infinite linear"
                  }}></span>
                      <style>
                        {`
                          @keyframes shineGradientBtn {
                            0% { opacity: 0.55; transform: translateX(-100%) }
                            100% { opacity: 0.55; transform: translateX(100%) }
                          }
                          .group:hover span[style*="shineGradientBtn"] {
                            opacity: 0.68;
                          }
                        `}
                      </style>
                    </button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Specialized Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Industry-specific services for unique shipping requirements
            </p>
          </div>

          <Tabs defaultValue="business" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="business">Business Solutions</TabsTrigger>
              <TabsTrigger value="personal">Personal Shipping</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
            
            <TabsContent value="business" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                {specializedServices.map((service, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="p-3 bg-blue-50 rounded-xl">
                          <service.icon className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                      </div>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => <div key={idx} className="flex items-center justify-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="personal">
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Shipping Made Easy</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Send gifts, documents, and personal items with our reliable personal shipping services.
                </p>
                <Button size="lg">
                  Ship Personal Items
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="enterprise">
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Solutions</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Scalable logistics solutions with dedicated support, API integration, and custom pricing.
                </p>
                <Button size="lg">
                  Contact Enterprise Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our customer-centric approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100">
              Choose the service that best fits your needs and experience hassle-free shipping
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                <CreditCard className="mr-2 h-4 w-4" />
                Book a Shipment
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-black-bold hover:bg-white/10">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Services;