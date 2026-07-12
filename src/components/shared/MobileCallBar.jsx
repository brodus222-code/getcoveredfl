import React from 'react';
import { Phone } from 'lucide-react';

export default function MobileCallBar() {
  return (
    <a
      href="tel:+18555925924"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-accent text-white py-3.5 px-6 flex items-center justify-center gap-3 shadow-glow-accent"
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
        <Phone className="w-4 h-4" />
      </div>
      <div className="text-left">
        <div className="text-[10px] font-medium text-white/85 uppercase tracking-wider">Tap to call now</div>
        <div className="text-base font-bold tracking-wide font-heading">(855) 592-5924</div>
      </div>
    </a>
  );
}