import React from 'react';
import { BadgeDollarSign } from 'lucide-react';

// Message-match strip for leads arriving from the price-led search ads
// (/rates "$56", /ppo-rates "$89") — keeps the ad promise visible through
// every wizard step.
export default function RatesPriceStrip({
  headline = 'Plans begin at $56/month.',
  body = 'These questions confirm the subsidy you qualify for so we can show your exact price.',
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-6">
      <div className="flex items-center gap-3 bg-accent-soft border-l-2 border-accent px-4 py-3">
        <BadgeDollarSign className="w-5 h-5 text-accent-deep shrink-0" />
        <p className="text-sm text-navy leading-snug">
          <span className="font-bold">{headline}</span> {body}
        </p>
      </div>
    </div>
  );
}