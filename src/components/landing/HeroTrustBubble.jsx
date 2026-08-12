import React from 'react';
import { Star } from 'lucide-react';

// 4.8/5 trust bubble — sits under the hero image (right column).
export default function HeroTrustBubble() {
  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl border border-sand-deep/60 px-3 py-2 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4 shadow-sm w-full">
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC107] fill-[#FFC107]" />
          ))}
        </div>
        <div className="text-left">
          <span className="block text-base sm:text-lg font-bold text-[#1A2332] font-heading leading-tight">4.8/5</span>
          <span className="block text-[11px] sm:text-xs text-[#607D8B] leading-snug">
            average rating
          </span>
        </div>
      </div>
    </div>
  );
}