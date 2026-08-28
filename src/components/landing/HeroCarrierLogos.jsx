import React from 'react';
import { carriers } from '@/components/landing/CarrierLogos';

// Carrier logos in bordered boxes — sits under the hero button (left column).
export default function HeroCarrierLogos() {
  return (
    <div className="mt-6 max-w-md mx-auto lg:mx-0">
      <div className="grid grid-cols-2 gap-3">
        {carriers.map((c) => (
          <div
            key={c.name}
            className="bg-white/95 border-l-2 border-accent px-3 py-4 flex items-center justify-center"
          >
            <img
              src={c.src}
              alt={`${c.name} logo`}
              title={c.name}
              className={`h-7 w-auto object-contain opacity-80 ${c.offset || ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}