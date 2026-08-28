import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AboutMissionCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-20 text-center text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-primary-deep/40 via-transparent to-primary/20" />
      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight text-balance mb-10">Our mission is simple: make quality health insurance accessible, understandable, and affordable for every Florida resident who needs it.</h2>
        <div className="border-t border-white/15 pt-9">
          <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3">Ready to find your plan?</h3>
          <p className="text-white/70 mb-6">Get a free quote in minutes — no obligation, no cost. Talk to a licensed Florida agent today.</p>
          <Link to="/Quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-3.5 rounded-xl shadow-glow-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy">
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}