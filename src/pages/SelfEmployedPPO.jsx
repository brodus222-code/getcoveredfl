import React, { useState } from 'react';
import { CheckCircle, Plus, Minus } from 'lucide-react';
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
  'Keep your own doctors, in Florida and out of state',
  'Open-access PPO plans with broad nationwide doctor & hospital networks',
  'See specialists directly — no referrals, no gatekeepers',
  'Enroll year-round — no waiting for open enrollment',
];

const faqs = [
  {
    q: 'Can self-employed Floridians get health insurance without an employer?',
    a: 'Yes. As a self-employed individual you can buy coverage directly through an open-access PPO plan — no employer or group required. You pick the plan, you own it, and it stays with you between gigs and clients.',
  },
  {
    q: 'What is an open-access PPO?',
    a: 'An open-access PPO lets you see any doctor or specialist in the network without a referral. You also have out-of-network coverage nationwide, so you are covered whether you are in Florida or traveling out of state.',
  },
  {
    q: 'Can I enroll any time of year, or do I have to wait for open enrollment?',
    a: 'Private PPO plans can be started year-round — there is no need to wait for the ACA open enrollment window. You can begin coverage as soon as the first of next month in most cases.',
  },
  {
    q: 'Are subsidies available for self-employed coverage?',
    a: 'If your income falls within certain ranges you may qualify for premium tax credits through the ACA Marketplace. Our licensed agents can compare your PPO and Marketplace options side by side to find the most affordable fit.',
  },
  {
    q: 'How fast can I get covered?',
    a: 'Coverage can start as soon as the first of next month in most cases. A licensed agent can walk you through enrollment in one short call.',
  },
  {
    q: 'Will my plan travel with me between jobs?',
    a: 'Yes. Because you own the policy — not an employer — your coverage stays with you between clients, side hustles, and full-time roles. There is no gap when you switch gigs.',
  },
];

export default function SelfEmployedPPO() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      <ZipHero
        badgeText="Open-Access PPO for Self-Employed Floridians"
        heading={<>Premium Health Coverage, <span className="text-accent">No Employer Required.</span></>}
        subheading={<>Stop settling for restrictive networks. Discover the freedom of an open-access PPO. Enter your ZIP code to see plans and prices in minutes.</>}
        zipPlaceholder="Zip Code"
        onAgentClick={() => setModalOpen(true)}
        heroImage="https://media.base44.com/images/public/696f51421917c989be527824/ac7ec09f5_generated_image.png"
        leftAlignForm
        belowButton={<HeroCarrierLogos />}
        belowImage={<HeroTrustBubble />}
      />

      {/* Mobile-only trust bubble (desktop shows it under the hero image) */}
      <div className="lg:hidden px-5 sm:px-6 pb-6">
        <div className="max-w-sm mx-auto">
          <HeroTrustBubble />
        </div>
      </div>

      <TrustBar />

      {/* Benefits */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Built for 1099 life
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
              Coverage that travels with you — not tied to an employer
            </h2>
            <p className="text-navy-soft">The advantages self-employed Floridians get with an open-access PPO instead of settling for a narrow network.</p>
          </div>
          <div className="space-y-3 max-w-2xl mx-auto">
            {benefits.map((text) => (
              <div
                key={text}
                className="bg-[#FBF7F2] rounded-xl px-5 py-4 flex items-center gap-4"
              >
                <CheckCircle className="w-6 h-6 text-[#345B7A] flex-shrink-0" />
                <span className="text-[#1A2B3C] font-medium leading-snug">{text}</span>
              </div>
            ))}
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
            Self-Employed Health Insurance Questions
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