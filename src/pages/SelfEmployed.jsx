import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin } from 'lucide-react';
import { Shield, CheckCircle, Phone, ArrowRight, Plus, Minus, Briefcase, Calculator, CalendarClock } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import TrustBar from '@/components/shared/TrustBar';
import CarrierLogos from '@/components/landing/CarrierLogos';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

const benefits = [
  'ACA subsidies that can lower your premium based on net income',
  'Self-employment income qualifies for premium tax credits',
  'Write off qualified medical and premium expenses on Schedule C',
  'Dental, vision & HSA-compatible plan options',
  'Special Enrollment Periods when your income changes mid-year',
  'Coverage that travels with you — not tied to an employer',
];

const reasons = [
  {
    icon: Calculator,
    title: 'Income-based subsidies',
    body: 'ACA premium credits are based on your net self-employment income, not gross. Many freelancers and contractors qualify for significantly reduced premiums after subsidies.',
  },
  {
    icon: Briefcase,
    title: 'No employer strings',
    body: 'Your coverage stays with you between gigs, clients, and side hustles — never tied to a W-2 or a single employer who could change your plan.',
  },
  {
    icon: CalendarClock,
    title: 'Enroll when income shifts',
    body: 'A change in your business income can trigger a Special Enrollment Period, letting you update or start coverage outside the normal window.',
  },
];

const faqs = [
  {
    q: 'Can I get health insurance if I\'m self-employed?',
    a: 'Yes. Self-employed Floridians — freelancers, contractors, gig workers, and sole proprietors — buy coverage through the ACA Marketplace and often qualify for subsidies based on net income.',
  },
  {
    q: 'How are subsidies calculated for 1099 income?',
    a: 'Premium tax credits use your net profit after deductible business expenses, not your gross revenue. That often lowers your subsidy threshold and increases the help you qualify for.',
  },
  {
    q: 'Can I write off my health insurance premiums?',
    a: 'Self-employed individuals may deduct qualified health insurance premiums above the line on their taxes. Always confirm with a tax professional, but our agents can point you toward plans that qualify.',
  },
  {
    q: 'What if my income changes during the year?',
    a: 'Report income changes and we can adjust your subsidy — sometimes mid-year — so your premium and plan stay aligned with what your business is actually earning.',
  },
  {
    q: 'What if I just lost my employer coverage?',
    a: 'Losing employer-sponsored coverage is a qualifying life event that opens a Special Enrollment Period. We can get you covered in days, not months.',
  },
];

export default function SelfEmployed() {
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const navigate = useNavigate();

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const zip = zipInput.replace(/\D/g, '').slice(0, 5);
    if (zip.length === 5) {
      navigate(`/Quote?zip=${zip}`);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      {/* Hero with ZIP entry */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-deep to-navy text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-turquoise/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 pt-8 pb-8 md:pt-14 md:pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">Health Insurance for the Self-Employed</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 tracking-tight font-heading text-balance">
            Coverage that works <span className="text-accent">as hard</span> as you do
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Self-employed in Florida? Find affordable health plans that stay with you — not tied to an employer.
          </p>

          {/* ZIP entry form */}
          <form onSubmit={handleZipSubmit} className="max-w-md mx-auto mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="tel"
                  inputMode="numeric"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="Zip Code"
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-white text-navy placeholder:text-navy-soft/50 focus:outline-none focus:ring-2 focus:ring-accent font-medium"
                  aria-label="ZIP code"
                />
              </div>
              <button
                type="submit"
                disabled={zipInput.length !== 5}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-4 rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 whitespace-nowrap"
              >
                Get Quotes
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Secondary call option */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <a
              href="tel:+18556345343"
              className="md:hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Me Instead
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              Talk to an Agent
            </button>
          </div>
        </div>
      </section>

      <TrustBar />

      <CarrierLogos />

      {/* Benefits */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Built for 1099 life
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
            Health coverage that flexes with your income
          </h2>
          <p className="text-navy-soft mb-10">The advantages self-employed Floridians get when they shop smart instead of settling.</p>
          <div className="space-y-3 text-left">
            {benefits.map((b) => (
              <div
                key={b}
                className="flex items-start gap-3 bg-sand border border-sand-deep/40 rounded-2xl px-5 py-4"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-navy font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons grid */}
      <section className="py-12 md:py-20 px-6 bg-sand">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Why it matters
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy font-heading text-balance">
              Your coverage shouldn&apos;t depend on an employer
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="bg-white rounded-2xl border border-sand-deep/40 p-6 shadow-soft"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2 font-heading">{r.title}</h3>
                  <p className="text-sm text-navy-soft leading-relaxed">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-deep py-12 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-balance">
            See your real subsidy in 2 minutes
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Enter your ZIP and income and a licensed agent will show you exactly what you qualify for — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={createPageUrl('Quote')}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
            >
              Start With My ZIP Code
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+18556345343"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              (855) 634-5343
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3 text-center w-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10 font-heading">
            Self-Employed Coverage Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-sand-deep/40 overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-semibold text-navy flex items-center justify-between hover:bg-sand/50 transition-colors"
                >
                  {faq.q}
                  <span className="w-7 h-7 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0 ml-4">
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-navy-soft text-sm leading-relaxed border-t border-sand-deep/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}