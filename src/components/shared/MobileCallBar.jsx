import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export default function MobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="tel:+18556345343"
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-accent text-white py-3.5 px-6 flex items-center justify-center gap-3 shadow-glow-accent transition-transform duration-300 ${
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