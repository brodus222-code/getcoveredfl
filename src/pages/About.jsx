import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import AboutHero from '@/components/about/AboutHero';
import AboutOverview from '@/components/about/AboutOverview';
import AboutMissionCta from '@/components/about/AboutMissionCta';

export default function About() {
  return (
    <div className="min-h-screen bg-sand pb-16 md:pb-0">
      <SiteHeader variant="transparent" />
      <main>
        <AboutHero />
        <AboutOverview />
        <AboutMissionCta />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}