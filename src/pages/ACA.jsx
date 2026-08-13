import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle, Phone, ArrowRight, Plus, Minus } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import TrustBar from '@/components/shared/TrustBar';
import HeroCarrierLogos from '@/components/landing/HeroCarrierLogos';
import HeroTrustBubble from '@/components/landing/HeroTrustBubble';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

const benefits = [
  '$0 monthly premium plans available in Florida',
  'Covers doctor visits, hospital stays & prescriptions',
  'Dental & vision add-ons available',
  'No penalty for switching plans',
  'Enrollment open year-round for qualifying events',
];

const faqs = [
  {
    q: 'Who qualifies for a $0 ACA plan?',
    a: 'Many Florida residents earning between 100%–400% of the federal poverty level qualify for subsidies that can bring their monthly premium to $0.',
  },
  {
    q: 'Is this a government website?',
    a: 'No. We are an independent, licensed Florida insurance agency — not affiliated with any government program.',
  },
  {
    q: 'How fast can I get covered?',
    a: 'Coverage can start as soon as the first of next month in most cases. Our agents can walk you through enrollment in one short call.',
  },
  {
    q: 'What if I missed open enrollment?',
    a: 'Life events like job loss, moving, or having a baby trigger a Special Enrollment Period. Call us to check if you qualify.',
  },
];

export default function ACA() {
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      <ZipHero
        badgeText="Florida's Trusted Health Insurance Marketplace"
        heading={<>Florida's trusted <span className="text-accent">Health Insurance Marketplace</span></>}
        subheading={<>Shop official ACA Marketplace plans, unlock subsidies that can dramatically lower your monthly premium, and find affordable coverage built around your budget — <strong className="text-white">in minutes.</strong></>}
        helperText="Enter your ZIP code below to compare plan options."
        zipPlaceholder="Zip Code"
        onAgentClick={() => setModalOpen(true)}
        heroImage="https://media.base44.com/images/public/696f51421917c989be527824/ac7ec09f5_generated_image.png"
        leftAlignForm
        belowButton={<HeroCarrierLogos />}
        belowImage={<HeroTrustBubble />}
      />

      {/* Mobile-only trust bubble (desktop shows it under the hero image) */}
      <div className="lg:hidden px-5 sm:px-6 pb-2">
        <div className="max-w-sm mx-auto">
          <HeroTrustBubble />
        </div>
      </div>

      <TrustBar />

      {/* Benefits */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            What's Included
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
            ACA Marketplace plans cover these essentials
          </h2>
          <p className="text-navy-soft mb-10">All ACA plans must cover these essential benefits by law.</p>
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

      {/* Mid CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-deep py-12 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-balance">
            Ready to see what you qualify for?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            It takes less than 2 minutes. A licensed agent will review your results and help you enroll.
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
            Frequently Asked Questions
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