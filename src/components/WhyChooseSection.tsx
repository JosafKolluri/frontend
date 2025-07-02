
import { Badge } from '@/components/ui/badge';
import { Package, Truck, Route, Star, CheckCircle, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Package,
    title: "Real-Time Tracking",
    description: "Monitor your package every step of the way with our advanced GPS tracking system and instant notifications.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    highlights: ["Live GPS tracking", "Instant alerts", "24/7 monitoring"]
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Same-day and next-day delivery options to meet your urgent shipping needs with guaranteed time slots.",
    color: "from-orange-500 to-red-500", 
    bgColor: "bg-orange-50",
    highlights: ["Same-day delivery", "Time slot booking", "Express handling"]
  },
  {
    icon: Route,
    title: "Global Network",
    description: "Worldwide shipping coverage with local expertise in every region and customs clearance support.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50", 
    highlights: ["200+ countries", "Local expertise", "Customs support"]
  }
];

const WhyChooseSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full animate-fade-in">
            <Star className="h-4 w-4 text-blue-600" />
            <Badge variant="secondary" className="bg-transparent border-0 text-blue-700 font-semibold">
              Why Choose SwiftTrack
            </Badge>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-extrabold animate-fade-in" style={{ animationDelay: '200ms' }}>
            <span className="bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 text-transparent bg-clip-text">
              Built for Modern
            </span>
            <br />
            <span className="text-gray-900">Commerce</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>
            Our cutting-edge technology and extensive network ensure your packages reach their destination safely and on time, every time. 
            Experience the future of logistics today.
          </p>
          
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-medium">4.9/5 from 50,000+ customers</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${800 + 200 * idx}ms`, animationFillMode: 'backwards' }}
            >
              {/* Card */}
              <div className={`relative h-full ${feature.bgColor} backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group-hover:-translate-y-2`}>
                {/* Icon */}
                <div className="relative mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-2 pt-2">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <div className="pt-4">
                    <button className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors group/link">
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: '1400ms', animationFillMode: 'backwards' }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-blue-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Trusted by 50M+ customers worldwide</span>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the millions who have chosen SwiftTrack for reliable, fast, and secure delivery services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
