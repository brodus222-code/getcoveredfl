import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import HeroCarrierLogos from '@/components/landing/HeroCarrierLogos';
import HeroTrustBubble from '@/components/landing/HeroTrustBubble';
import HowItWorks from '@/components/landing/HowItWorks';
import CoverageTiles from '@/components/landing/CoverageTiles';
import AboutSection from '@/components/landing/AboutSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <SiteHeader variant="light" />
      <ZipHero
        badgeText="Florida's Trusted Health Insurance Guide"
        heading="Find Affordable Health Insurance in Florida"
        subheading="Compare plans, unlock subsidies, and find coverage that fits your budget — in under 2 minutes. Plans from $0/month available."
        helperText="Enter your ZIP code below to compare plans."
        zipPlaceholder="Zip Code"
        heroImage="https://media.base44.com/images/public/696f51421917c989be527824/3d0905bcf_generated_image.png"
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

      <HowItWorks />
      <CoverageTiles />
      <AboutSection />
      <FinalCTA />
      <Footer />
      <MobileCallBar />
    </div>
  );
}