import { useState } from 'react';
import { Search, Package, Truck, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface TrackingSearchProps {
  onTrack: (trackingNumber: string) => void;
}

const TrackingSearch = ({ onTrack }: TrackingSearchProps) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setIsSearching(true);
      // Simulate search delay for better UX
      setTimeout(() => {
        onTrack(trackingNumber.trim());
        setIsSearching(false);
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-0 shadow-xl bg-white relative overflow-hidden">
        <CardContent className="p-10 relative z-10">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-lg">
                  <Package className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <div className="p-1.5 bg-yellow-400 rounded-full animate-pulse">
                    <Sparkles className="h-3 w-3 text-yellow-800" />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Track Your Package
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              Enter your tracking number and get real-time updates with detailed delivery information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., ST123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="h-16 pl-6 pr-16 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-gray-300 focus:shadow-lg"
                disabled={isSearching}
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <Search className={`h-6 w-6 transition-colors duration-300 ${
                  trackingNumber ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
            </div>
            
            {/* Professional, theme-matching Track Package button */}
            <button
              type="submit"
              className={`
                w-full h-16
                rounded-2xl
                font-semibold
                text-lg
                flex items-center justify-center relative
                bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800
                hover:from-blue-700 hover:to-indigo-900
                text-white
                shadow-md hover:shadow-lg
                transition-all duration-200
                hover:scale-105 active:scale-98
                disabled:opacity-60 disabled:cursor-not-allowed
                group
              `}
              disabled={!trackingNumber.trim() || isSearching}
              style={{ boxShadow: "0 8px 24px 0 rgba(52, 82, 255, 0.13)" }}
            >
              {/* Shine effect, subtle for professionalism */}
              <span
                className="absolute left-0 top-0 h-full w-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(102deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.22) 46%,rgba(255,255,255,0.09) 100%)",
                  opacity: 0.5,
                  mixBlendMode: "lighten",
                  transition: "opacity 0.15s",
                  animation: isSearching ? "none" : "shineAnimPro 2.5s infinite linear"
                }}
              ></span>
              <style>
                {`
                  @keyframes shineAnimPro {
                    0% { opacity: 0.5; transform: translateX(-100%) }
                    100% { opacity: 0.5; transform: translateX(100%) }
                  }
                  .group:hover span[style*="shineAnimPro"] {
                    opacity: 0.65;
                  }
                `}
              </style>
              {isSearching ? (
                <div className="flex items-center space-x-3 z-10">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-bold">Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3 z-10">
                  <span className="font-bold tracking-wide text-white">Track Package</span>
                  <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-2 transition-transform duration-150" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Don't have a tracking number?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="ghost" className="text-blue-600 font-medium hover:bg-blue-50 rounded-xl">
                Contact Support
              </Button>
              <Button variant="ghost" className="text-blue-600 font-medium hover:bg-blue-50 rounded-xl">
                Check Shipment Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingSearch;
