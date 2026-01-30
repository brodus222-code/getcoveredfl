import React from 'react';
import { Phone } from "lucide-react";

export default function MobileCallBar() {
  return (
    <a 
      href="tel:+18555925924"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-6 flex items-center justify-center gap-3 shadow-lg shadow-teal-900/30"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 animate-pulse">
        <Phone className="w-5 h-5" />
      </div>
      <div className="text-left">
        <div className="text-xs font-medium text-teal-100">Call Now for Help</div>
        <div className="text-lg font-bold tracking-wide">(855) 592-5924</div>
      </div>
    </a>
  );
}