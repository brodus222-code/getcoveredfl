import React, { useState } from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import HeroCarrierLogos from '@/components/landing/HeroCarrierLogos';
import HeroTrustBubble from '@/components/landing/HeroTrustBubble';
import HowItWorks from '@/components/landing/HowItWorks';
import PpoRatesPriceProof from '@/components/landing/PpoRatesPriceProof';
import RatesValueRow from '@/components/landing/RatesValueRow';
import PpoRatesFaq from '@/components/landing/PpoRatesFaq';
import FinalCTA from '@/components/landing/FinalCTA';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

export default function SelfEmployedRates() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" staticLogo />
      <ZipHero
        badgeText="Health Insurance for Self-Employed Floridians"
        heading={<>Self-employed health plans begin at <span className="text-accent">$89 a month</span></>}
        subheading="No employer required. Compare private PPO options with broad nationwide networks, no specialist referrals, and year-round enrollment."
        helperText="Enter your ZIP code to see plans available in your area."
        zipPlaceholder="Zip Code"
        buttonText="See My Plan Options"
        source="selfemployed-rates"
        onAgentClick={() => setModalOpen(true)}
        showCallCta
        heroImage="https://media.base44.com/images/public/696f51421917c989be527824/05e996407_getcoveredfl_family_sunset_hero.jpg"
        leftAlignForm
        belowButton={<HeroCarrierLogos />}
        belowImage={<HeroTrustBubble />}
      />
      <div className="lg:hidden px-5 sm:px-6 pb-2"><div className="max-w-sm mx-auto"><HeroTrustBubble /></div></div>
      <HowItWorks />
      <PpoRatesPriceProof />
      <RatesValueRow />
      <PpoRatesFaq />
      <FinalCTA />
      <LandingFooter />
      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} notes="Self-employed $89 rates landing page (/self-employed-rates)" />
    </div>
  );
}