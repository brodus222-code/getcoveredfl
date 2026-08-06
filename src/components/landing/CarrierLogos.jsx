import React from 'react';

// Carrier logos uploaded by the agency — displayed under the hero for trust.
const carriers = [
  {
    name: 'Blue Cross Blue Shield',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/63996acff_bcbs_logo_transparent.png',
    offset: 'mt-[10px]',
  },
  {
    name: 'UnitedHealthcare',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/bd726061f_uhc_logo.png',
  },
  {
    name: 'Aetna',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/404e068e7_aetna_logo.png',
  },
  {
    name: 'Cigna',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/c22bad847_cigna_logo.svg',
  },
];

export default function CarrierLogos() {
  return (
    <section className="w-full bg-sand">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8">
        <p className="text-center text-xs uppercase tracking-widest font-semibold text-navy-soft mb-6">
          Plans from carriers you trust
        </p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-items-center sm:justify-center gap-x-8 sm:gap-x-12 gap-y-5">
          {carriers.map((c) => (
            <img
              key={c.name}
              src={c.src}
              alt={`${c.name} logo`}
              title={c.name}
              className={`h-10 sm:h-12 w-auto max-w-[140px] object-contain opacity-70 hover:opacity-100 transition-opacity ${c.offset || ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}