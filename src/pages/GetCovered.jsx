import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Phone, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import WrongPlanProblems from '@/components/landing/WrongPlanProblems';
import HowWeFixIt from '@/components/landing/HowWeFixIt';
import HeroCarrierLogos from '@/components/landing/HeroCarrierLogos';
import HeroTrustBubble from '@/components/landing/HeroTrustBubble';
import FinalCTA from '@/components/landing/FinalCTA';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

export default function GetCovered() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" staticLogo />
      <ZipHero
        badgeText="Free Marketplace Plan Review"
        heading={<>Picked the wrong Marketplace plan? <span className="text-accent">We'll fix it — free.</span></>}
        subheading="Wrong doctors, costly prescriptions, or a deductible you can't afford? A licensed Florida agent will review your enrollment and correct it at no cost to you."
        helperText="Enter your ZIP code below to compare plans."
        zipPlaceholder="Zip Code"
        source="fix-account"
        onAgentClick={() => setModalOpen(true)}
        showCallCta
        heroImage="https://media.base44.com/images/public/696f51421917c989be527824/05e996407_getcoveredfl_family_sunset_hero.jpg"
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

      <WrongPlanProblems />

      <HowWeFixIt />

      {/* Mid CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-deep py-12 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-balance">
            Let's get you into the right plan
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            There's no fee for our help, and no obligation to switch. A licensed Florida agent reviews your plan with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={createPageUrl('Quote')}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
            >
              Review My Plan
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
      <LandingFooter />
      <MobileCallBar />
      <CallbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        notes="Fix Marketplace account request — picked the wrong plan (/GetCovered)"
      />
    </div>
  );
}