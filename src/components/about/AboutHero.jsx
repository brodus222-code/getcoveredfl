import React from 'react';
import { ShieldCheck, Handshake, LockKeyhole } from 'lucide-react';

const assurances = [
  { icon: ShieldCheck, label: 'Licensed FL Agency' },
  { icon: Handshake, label: 'Carrier Partners' },
  { icon: LockKeyhole, label: 'Secure Portal' },
];

export default function AboutHero() {
  return (
    <section className="bg-navy pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 min-h-[460px]">
        <div className="flex items-center px-6 py-16 md:px-10 lg:px-6 lg:py-20">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white leading-[1.04] tracking-tight text-balance mb-6">About<br />GetCoveredFL</h1>
            <p className="text-xl md:text-2xl text-white/85 leading-snug max-w-lg">Helping Florida residents find affordable health insurance — one quote at a time.</p>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
          <img src="https://media.base44.com/images/public/696f51421917c989be527824/05e996407_getcoveredfl_family_sunset_hero.jpg" alt="Florida family walking together on the beach" width="1536" height="1024" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/25 to-transparent lg:block hidden" />
        </div>
      </div>
      <div className="bg-accent text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3">
          {assurances.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-3 min-h-16 px-5 py-4 border-b sm:border-b-0 sm:border-r last:border-0 border-white/20 font-semibold">
              <Icon className="w-6 h-6" strokeWidth={1.8} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}