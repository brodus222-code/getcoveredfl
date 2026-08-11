import React from 'react';
import { Headphones, Phone } from 'lucide-react';

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1A2432] text-white py-3.5 px-5 flex items-center justify-between gap-3 shadow-soft">
      <a href="tel:+18556345343" className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#2C394B] flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1A2432]" />
        </div>
        <div className="text-left min-w-0">
          <div className="text-xs text-white/70">Licensed Advisor Available</div>
          <div className="text-sm font-bold font-heading">(855) 634-5343</div>
        </div>
      </a>
      <a
        href="tel:+18556345343"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-5 py-2.5 rounded-xl transition-all flex-shrink-0"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
    </div>
  );
}