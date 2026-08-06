import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Phone, ArrowRight, Wrench, ShieldCheck, Clock } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import TrustBar from '@/components/shared/TrustBar';
import CarrierLogos from '@/components/landing/CarrierLogos';
import EligibilityBanner from '@/components/landing/EligibilityBanner';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

export default function GetCovered() {
  const [modalOpen, setModalOpen] = useState(false);

  const CallbackCta = ({ mobile = false }) => (
    mobile ? (
      <a
        href="tel:+18556345343"
        className="md:hidden inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm shadow-glow-accent"
      >
        <Phone className="w-4 h-4" />
        Have an Agent Call Me
      </a>
    ) : (
      <button
        onClick={() => setModalOpen(true)}
        className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm shadow-glow-accent"
      >
        <Phone className="w-4 h-4" />
        Have an Agent Call Me
      </button>
    )
  );

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />
      <ZipHero
        badgeText="Florida's Trusted Health Insurance Guide"
        heading="Find Affordable Health Insurance in Florida"
        subheading="Compare plans, unlock subsidies, and find coverage that fits your budget — in under 2 minutes. Plans from $0/month available."
        onAgentClick={() => setModalOpen(true)}
      />
      <CarrierLogos />
      <TrustBar />

      {/* Eligibility banner with image */}
      <EligibilityBanner />

      {/* Fix Marketplace Account */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-soft border border-sand-deep/40">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-8">
              <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-primary-soft flex items-center justify-center">
                <Wrench className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-navy mb-2 font-heading">
                  Is your Marketplace account wrong?
                </h3>
                <p className="text-navy-soft mb-4">
                  We can fix it for free. Wrong income, wrong household size, or wrong plan — our agents handle corrections every day.
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <Link
                    to={createPageUrl('Quote')}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-colors"
                  >
                    Get Help Fixing My Account
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <CallbackCta />
                  <CallbackCta mobile />
                </div>
              </div>
            </div>
            <div className="bg-sand/60 border-t border-sand-deep/40 px-6 py-2 text-center text-xs text-navy-soft/70">
              We never share or sell your information.
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 px-6 bg-sand">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: 'Licensed & Bonded', desc: 'Florida-licensed insurance agency with trained advisors.' },
            { icon: Clock, title: 'Year-Round Help', desc: 'Open enrollment or special enrollment — we handle both.' },
            { icon: Phone, title: 'Real Humans', desc: 'Talk to a Florida agent, not a call center. Free consultation.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-sand-deep/40 shadow-soft text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-soft text-primary mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-navy mb-1 font-heading">{title}</h4>
              <p className="text-sm text-navy-soft">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
      <Footer />
      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}