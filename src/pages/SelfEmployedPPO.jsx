import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';
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
  'Open-access PPO plans with broad nationwide doctor & hospital networks',
  'See specialists directly — no referrals, no gatekeepers',
  'Enroll year-round — no waiting for open enrollment',
];

export default function SelfEmployedPPO() {
  const [modalOpen, setModalOpen] = useState(false);

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

      {/* Mid CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-deep py-12 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-balance">
            Ready to see your PPO options?
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

      <FinalCTA />
      <Footer />
      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}