import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import HeroCarrierLogos from '@/components/landing/HeroCarrierLogos';
import HeroTrustBubble from '@/components/landing/HeroTrustBubble';
import HowItWorks from '@/components/landing/HowItWorks';
import RatesPriceProof from '@/components/landing/RatesPriceProof';
import RatesValueRow from '@/components/landing/RatesValueRow';
import RatesFaq from '@/components/landing/RatesFaq';
import FinalCTA from '@/components/landing/FinalCTA';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

export default function Rates() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" staticLogo />

      <ZipHero
        badgeText="Special Enrollment Period Now Open"
        heading={<>Florida health plans begin at <span className="text-accent">$56 a month</span></>}
        subheading="See the subsidized rate you qualify for in about 2 minutes. Free to use, no obligation, and a licensed Florida agent walks you through your options."
        helperText="Enter your ZIP code below to compare plans."
        zipPlaceholder="Zip Code"
        source="rates"
        onAgentClick={() => setModalOpen(true)}
        showCallCta
        heroImage="https://media.base44.com/images/public/696f51421917c989be527824/3d0905bcf_generated_image.png"
        leftAlignForm
        belowButton={<HeroCarrierLogos />}
        belowImage={<HeroTrustBubble />}
      />

      <div className="lg:hidden px-5 sm:px-6 pb-2">
        <div className="max-w-sm mx-auto">
          <HeroTrustBubble />
        </div>
      </div>

      <HowItWorks />

      <RatesPriceProof />

      <RatesValueRow />

      {/* Mid CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-deep py-12 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-balance">
            Find out what your rate actually is
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Most Floridians qualify for help paying their premium. It takes two minutes to know your number.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/Quote?source=rates"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
            >
              Start My Quote
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

      <RatesFaq />

      <FinalCTA />
      <LandingFooter />
      <MobileCallBar />
      <CallbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        notes="Rates landing page — plans begin at $56 (/rates)"
      />
    </div>
  );
}