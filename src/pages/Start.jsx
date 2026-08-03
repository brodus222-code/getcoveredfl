import React from 'react';
import { Phone } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import MobileCallBar from '@/components/shared/MobileCallBar';
import Footer from '@/components/shared/Footer';
import QuoteWizard from '@/components/quote/QuoteWizard';

// Option B landing — a distinct, hero-led entry that drops visitors straight
// onto the quote wizard. Shares the same wizard as /quote but with its own
// conversion-focused shell so the two URLs can be A/B tested against each other.
export default function Start() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      <section className="relative bg-gradient-to-br from-primary via-primary-deep to-navy text-white overflow-hidden">
        <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-turquoise/20 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 py-12 md:py-16 text-center">
          <span className="inline-block bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest mb-5">
            Florida Health Insurance · 2026
          </span>
          <h1 className="text-3xl md:text-[2.6rem] leading-tight font-bold font-heading text-balance">
            Get covered in 60 seconds — ACA plans from $0/month
          </h1>
          <p className="mt-4 text-white/85 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Compare plans across top Florida carriers with a licensed agent. Free, no obligation, and subsidies applied automatically.
          </p>
          <a
            href="tel:+18556345343"
            className="inline-flex items-center gap-2 mt-6 text-white/90 hover:text-white text-sm font-medium"
          >
            <Phone className="w-4 h-4 text-accent" />
            Prefer to talk? <span className="font-bold font-heading tracking-wide">(855) 634-5343</span>
          </a>
        </div>
      </section>

      <QuoteWizard />

      <Footer />
      <MobileCallBar />
    </div>
  );
}