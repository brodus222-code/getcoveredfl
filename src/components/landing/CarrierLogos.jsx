import React from 'react';

// Carrier wordmarks displayed under the hero for trust. Each uses its brand
// color via inline style (one-off brand values, not theme tokens).
const carriers = [
  { name: 'Cigna', color: '#007EA7' },
  { name: 'UnitedHealthcare', color: '#002677' },
  { name: 'Aetna', color: '#003C71' },
  { name: 'Ambetter', color: '#EC008C' },
];

export default function CarrierLogos() {
  return (
    <section className="w-full bg-white border-y border-sand-deep/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-8">
        <p className="text-center text-xs uppercase tracking-widest font-semibold text-navy-soft mb-6">
          Plans from carriers you trust
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-5">
          {carriers.map((c) => (
            <span
              key={c.name}
              className="text-xl sm:text-2xl font-bold tracking-tight opacity-70 hover:opacity-100 transition-opacity font-heading"
              style={{ color: c.color }}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}