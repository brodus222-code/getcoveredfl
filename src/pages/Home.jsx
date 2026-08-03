import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import TrustBar from '@/components/shared/TrustBar';
import CarrierLogos from '@/components/landing/CarrierLogos';
import HowItWorks from '@/components/landing/HowItWorks';
import CoverageTiles from '@/components/landing/CoverageTiles';
import AboutSection from '@/components/landing/AboutSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <SiteHeader variant="transparent" />
      <ZipHero
        badgeText="Florida's Trusted Health Insurance Guide"
        heading="Find Affordable Health Insurance in Florida"
        subheading="Compare plans, unlock subsidies, and find coverage that fits your budget — in under 2 minutes. Plans from $0/month available."
      />
      <CarrierLogos />
      <TrustBar />
      <HowItWorks />
      <CoverageTiles />
      <AboutSection />
      <FinalCTA />
      <Footer />
      <MobileCallBar />
    </div>
  );
}