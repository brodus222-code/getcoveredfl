import React from 'react';
import { Phone } from 'lucide-react';

export default function MedicareBridge({ medicare }) {
  return (
    <>
      <p className="text-navy-soft mb-6">{medicare.text}</p>
      <a href="tel:+18556345343" className="flex items-center justify-between gap-4 bg-navy text-white p-5 border-l-2 border-accent hover:bg-primary-deep transition-colors">
        <span className="font-semibold">{medicare.cta}</span>
        <span className="flex items-center gap-2 text-accent font-semibold"><Phone className="w-4 h-4" /> (855) 634-5343</span>
      </a>
    </>
  );
}