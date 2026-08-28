import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import AffordableHero from '@/components/affordable/AffordableHero';
import AffordableSteps from '@/components/affordable/AffordableSteps';
import AffordableOptions from '@/components/affordable/AffordableOptions';
import RatesValueRow from '@/components/landing/RatesValueRow';
import AffordableFaq from '@/components/affordable/AffordableFaq';
import AffordableCta from '@/components/affordable/AffordableCta';

export default function Affordable() {
  return (
    <div className="min-h-screen bg-sand pb-16 md:pb-0">
      <SiteHeader variant="transparent" />
      <main>
        <AffordableHero />
        <AffordableSteps />
        <AffordableOptions />
        <RatesValueRow />
        <AffordableFaq />
        <AffordableCta />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}