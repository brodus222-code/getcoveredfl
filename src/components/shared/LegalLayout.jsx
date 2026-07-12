import React from 'react';
import SiteHeader from '@/components/shared/SiteHeader';
import Footer from '@/components/shared/Footer';

export default function LegalLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-sand flex flex-col">
      <SiteHeader variant="light" />

      <div className="bg-navy text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">{title}</h1>
          {subtitle && <p className="text-lg text-white/70 max-w-2xl leading-relaxed">{subtitle}</p>}
          {lastUpdated && <p className="text-sm text-white/50 mt-4">Last updated: {lastUpdated}</p>}
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}