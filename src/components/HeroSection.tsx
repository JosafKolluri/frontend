
import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEMO_TRACKING = 'ST123456789';

interface HeroSectionProps {
  searching: boolean;
  inputValue: string;
  setInputValue: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const HeroSection = ({
  searching,
  inputValue,
  setInputValue,
  onSubmit,
}: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#266CF6] to-[#1B47C7] py-28 px-2 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Track Your Package</h1>
        <p className="text-lg md:text-2xl text-blue-100 mb-10">
          Get real-time updates on your shipment status with our advanced tracking system
        </p>
        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7"
          onSubmit={onSubmit}
        >
          <div className="relative w-full sm:w-[400px]">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter tracking number (e.g., ST123456789)"
              className="w-full h-14 pl-12 pr-4 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
              disabled={searching}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto h-14 px-8 rounded-lg font-semibold text-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white shadow transition disabled:opacity-60 flex items-center justify-center"
            disabled={!inputValue.trim() || searching}
            style={{ minWidth: 180 }}
          >
            {searching ? (
              <span className="flex items-center">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Searching...
              </span>
            ) : (
              <>
                Track Package
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </form>
        <div className="mt-2 text-base text-blue-100">
          Need help? Try tracking number:&nbsp;
          <span className="inline-block bg-white/10 text-white font-semibold px-3 py-1 rounded">
            {DEMO_TRACKING}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
