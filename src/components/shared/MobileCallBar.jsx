import React from 'react';
import { Headphones } from 'lucide-react';

export default function MobileCallBar() {
  return (
    <a
      href="tel:+18556345343"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1A2432] text-white py-3.5 px-5 flex items-center gap-3 shadow-soft"
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#2C394B] flex items-center justify-center">
          <Headphones className="w-5 h-5 text-white" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1A2432]" />
      </div>
      <div className="text-left">
        <div className="text-xs text-white/70">Licensed Advisor Available</div>
        <div className="text-sm font-bold font-heading">(855) 634-5343</div>
      </div>
    </a>
  );
}