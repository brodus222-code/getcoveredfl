import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function EligibilityBanner() {
  return (
    <section className="bg-sand py-10 px-4">
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-soft bg-white border border-sand-deep/40 flex flex-col md:flex-row items-center">
        <div className="md:w-2/5 w-full flex-shrink-0">
          <img
            src="https://media.base44.com/images/public/696f51421917c989be527824/edd9dd31f_Floridaeligibility2.png"
            alt="You may qualify for $0 plans"
            className="w-full h-full object-cover object-top max-h-56 md:max-h-80"
          />
        </div>

        <div className="flex-1 px-6 py-6 md:px-8 md:py-8 text-center md:text-left flex flex-col items-center md:items-start justify-center">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Eligibility Check
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-navy leading-snug mb-3 font-heading text-balance">
            You may qualify for <span className="text-accent">$0/month</span>
            <br />or low-cost Marketplace plans
          </h2>

          <p className="text-navy-soft text-base mb-6 max-w-md leading-relaxed">
            Most Florida residents don't realize their savings change when income or household info changes — <strong className="text-navy">even slightly.</strong> Let us check in minutes.
          </p>

          <Link
            to={createPageUrl('Quote')}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
          >
            Check My Eligibility
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-xs text-navy-soft/70 mt-4">
            Independent licensed Florida agency — not a government site.
          </p>
        </div>
      </div>
    </section>
  );
}