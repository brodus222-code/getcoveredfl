import React from 'react';
import { carriers } from '@/components/landing/CarrierLogos';

// Carrier logos in bordered boxes — sits under the hero button (left column).
export default function HeroCarrierLogos() {
  return (
    <div className="mt-6 max-w-md mx-auto lg:mx-0">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-[#607D8B] mb-3 text-center lg:text-left">
        Compare plans from top carriers
      </p>
      <div className="flex items-center justify-center lg:justify-start gap-3">
        {carriers.map((c) => (
          <div
            key={c.name}
            className="bg-white rounded-xl border border-sand-deep/60 px-3 py-2 flex items-center justify-center"
          >
            <img
              src={c.src}
              alt={`${c.name} logo`}
              title={c.name}
              className={`h-6 w-auto object-contain opacity-80 ${c.offset || ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}