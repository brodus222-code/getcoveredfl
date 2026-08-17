import React from 'react';

// Carrier logos uploaded by the agency — displayed under the hero for trust.
export const carriers = [
  {
    name: 'Anthem Blue Cross',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/067c219b4_Anthem_Blue_Cross_Final_Verified_v51.png',
  },
  {
    name: 'UnitedHealthcare',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/1117aef4f_uhc_logo_final.svg',
  },
  {
    name: 'Aetna',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/85bd65646_aetna_logo1.png',
  },
  {
    name: 'Health First',
    src: 'https://media.base44.com/images/public/696f51421917c989be527824/f40d4bd45_health_first_logo_tight1.png',
  },
];

export default function CarrierLogos() {
  return (
    <section className="w-full bg-sand">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-4 pb-8 sm:py-8">
        <p className="hidden sm:block text-center text-xs uppercase tracking-widest font-semibold text-navy-soft mb-6">
          Plans from carriers you trust
        </p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-items-center sm:justify-center gap-x-8 sm:gap-x-12 gap-y-4">
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