import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/shared/TrustBar';
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
      <HeroSection />
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