import React, { useState } from 'react';
import { Phone } from 'lucide-react';

export default function MobileCallBar() {
  const [visible] = useState(true);

  return (
    <a
      href="tel:+18556345343"
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1A2432] text-white py-3.5 px-6 flex items-center justify-center gap-3 shadow-soft transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
        <Phone className="w-4 h-4" />
      </div>
      <div className="text-left">
        <div className="text-[10px] font-medium text-white/85 uppercase tracking-wider">Tap to call now</div>
        <div className="text-base font-bold tracking-wide font-heading">(855) 634-5343</div>
      </div>
    </a>
  );
}