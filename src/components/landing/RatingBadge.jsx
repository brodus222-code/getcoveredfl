import React from 'react';
import { Star } from 'lucide-react';

export default function RatingBadge() {
  return (
    <section className="w-full bg-sand">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pb-8 sm:pb-10">
        <div className="mx-auto max-w-md bg-white rounded-2xl border border-sand-deep/60 px-5 py-4 flex items-center gap-4 shadow-sm">
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="w-5 h-5 text-[#FFC107] fill-[#FFC107]"
              />
            ))}
          </div>
          <div className="text-left">
            <span className="block text-lg font-bold text-[#1A2332] font-heading leading-tight">
              4.8/5
            </span>
            <span className="block text-xs text-[#607D8B] leading-snug">
              average rating from verified shoppers across our network
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}