import React from 'react';
import { BadgeCheck, Star } from 'lucide-react';

// 4.8/5 trust strip — sits under the hero image (right column).
export default function HeroTrustBubble() {
  return (
    <div className="mt-6">
      <div className="w-full rounded-xl border border-[#DED4BE] bg-[#F8F3E8] px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-5 h-5 text-[#A87908] fill-[#A87908]" strokeWidth={1.5} />
            ))}
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#203A4D] font-heading leading-none">4.8/5</span>
        </div>
        <div className="hidden sm:block self-stretch w-px bg-[#DED4BE]" />
        <p className="text-sm text-[#203A4D] leading-snug text-left">
          average rating from{' '}
          <span className="font-medium">
            <BadgeCheck className="inline-block w-4 h-4 mr-1 align-[-2px] text-[#8BA7B5]" strokeWidth={1.75} />
            verified shoppers
          </span>{' '}
          across our network
        </p>
      </div>
    </div>
  );
}