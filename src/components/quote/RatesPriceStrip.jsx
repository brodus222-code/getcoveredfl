import React from 'react';
import { BadgeDollarSign } from 'lucide-react';

// Message-match strip for leads arriving from the /rates "$56" search ads —
// keeps the ad promise visible through every wizard step.
export default function RatesPriceStrip() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-6">
      <div className="flex items-center gap-3 bg-accent-soft border border-accent/30 rounded-2xl px-4 py-3">
        <BadgeDollarSign className="w-5 h-5 text-accent-deep shrink-0" />
        <p className="text-sm text-navy leading-snug">
          <span className="font-bold">Plans begin at $56/month.</span>{' '}
          These questions confirm the subsidy you qualify for so we can show your exact price.
        </p>
      </div>
    </div>
  );
}