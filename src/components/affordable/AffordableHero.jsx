import React from 'react';
import { ShieldCheck, BadgeDollarSign, UserCheck } from 'lucide-react';
import AffordableZipForm from '@/components/affordable/AffordableZipForm';

const assurances = [
  { icon: BadgeDollarSign, label: 'Plans From $0/Month May Be Available' },
  { icon: ShieldCheck, label: 'Licensed Florida Agency' },
  { icon: UserCheck, label: 'Free Agent Guidance' },
];

export default function AffordableHero() {
  return (
    <section className="bg-navy pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 min-h-[570px]">
        <div className="flex items-center px-6 py-14 lg:pr-12">
          <div>
            <p className="text-accent font-bold uppercase tracking-[0.18em] text-sm mb-5">Affordable Florida Health Insurance</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-white leading-[1.05] tracking-tight text-balance mb-6">Coverage that fits your life — and your budget.</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-8">Compare ACA Marketplace and private health plans available in your Florida ZIP code. A licensed agent helps you understand the price, benefits, and network before you choose.</p>
            <AffordableZipForm />
          </div>
        </div>
        <div className="relative min-h-[390px] lg:min-h-0 overflow-hidden">
          <img src="https://media.base44.com/images/public/696f51421917c989be527824/05e996407_getcoveredfl_family_sunset_hero.jpg" alt="Florida family walking on the beach at sunset" width="1536" height="1024" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-[61%_center]" />
        </div>
      </div>
      <div className="bg-accent text-white">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3">
          {assurances.map(({ icon: Icon, label }) => <div key={label} className="flex min-h-16 items-center justify-center gap-3 border-b border-white/20 px-5 py-4 text-center font-semibold sm:border-b-0 sm:border-r last:border-0"><Icon className="w-6 h-6 shrink-0" strokeWidth={1.8} /><span>{label}</span></div>)}
        </div>
      </div>
    </section>
  );
}