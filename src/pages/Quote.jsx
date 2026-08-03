import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import MobileCallBar from '@/components/shared/MobileCallBar';
import Footer from '@/components/shared/Footer';
import QuoteWizard from '@/components/quote/QuoteWizard';

export default function Quote() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-white pb-20 md:pb-0">
      <SiteHeader variant="light" />
      <QuoteWizard />
      <Footer />
      <MobileCallBar />
    </div>
  );
}