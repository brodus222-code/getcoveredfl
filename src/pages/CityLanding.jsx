import React, { useState } from 'react';
import { CheckCircle, Plus, Minus, MapPin } from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import ZipHero from '@/components/landing/ZipHero';
import HowItWorks from '@/components/landing/HowItWorks';
import HeroCarrierLogos from '@/components/landing/HeroCarrierLogos';
import HeroTrustBubble from '@/components/landing/HeroTrustBubble';
import FinalCTA from '@/components/landing/FinalCTA';
import TopRatedBadge from '@/components/landing/TopRatedBadge';
import LandingFooter from '@/components/shared/LandingFooter';
import MobileCallBar from '@/components/shared/MobileCallBar';
import CallbackModal from '@/components/quote/CallbackModal';

// Shared benefits shown on every city page — the local value is in the
// hero copy, nearby-areas list, and city-specific FAQs.
const benefits = [
  'Compare Florida\'s top 10 health plans side by side',
  'Keep your own doctors — broad Florida and nationwide networks',
  'See specialists directly, no referrals required',
  'Licensed Florida agents — free, no-obligation guidance',
  'Enroll year-round, with coverage starting as soon as next month',
];

export default function CityLanding({ city }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  if (!city) return null;

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" staticLogo />

      <ZipHero
        badgeText={`Licensed Florida Agents — ${city.region}`}
        heading={<>Health Insurance in <span className="text-accent">{city.name}, FL</span></>}
        subheading={city.subheading}
        zipPlaceholder="Zip Code"
        buttonText="Start My Quote"
        helperText="Enter your ZIP code below to compare plans."
        source={`${city.slug}-city`}
        onAgentClick={() => setModalOpen(true)}
        heroImage={city.heroImage}
        leftAlignForm
        belowButton={<HeroCarrierLogos />}
        belowImage={<HeroTrustBubble />}
      />

      {/* Mobile-only trust bubble */}
      <div className="lg:hidden px-5 sm:px-6 pb-6">
        <div className="max-w-sm mx-auto">
          <HeroTrustBubble />
        </div>
      </div>

      <HowItWorks />

      {/* Local intro + nearby areas */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Local coverage in {city.name}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading text-balance">
            Trusted health insurance guidance for {city.name} residents
          </h2>
          <p className="text-navy-soft leading-relaxed mb-6">
            GetCoveredFL is {city.populationNote}, {city.landmarkNote}. Our licensed Florida
            agents help {city.county} residents compare plans, check subsidy eligibility, and
            enroll — all in one short call. We serve {city.name} and nearby communities
            including {city.nearby.join(', ')}.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {city.nearby.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 bg-primary-soft text-primary-deep text-sm font-medium px-3 py-1.5 rounded-full"
              >
                <MapPin className="w-3.5 h-3.5" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-20 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Why {city.name} residents choose us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
              Affordable Florida coverage, simplified
            </h2>
            <p className="text-navy-soft">Everything you need to find the right plan in {city.county}.</p>
          </div>
          <div className="space-y-3 max-w-2xl mx-auto">
            {benefits.map((text) => (
              <div
                key={text}
                className="bg-white border-l-2 border-accent px-5 py-4 flex items-center gap-4"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-navy font-medium leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TopRatedBadge />

      {/* City-specific FAQ */}
      <section className="py-12 md:py-20 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3 text-center w-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10 font-heading">
            {city.name} Health Insurance Questions
          </h2>
          <div className="space-y-3">
            {city.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-sand-deep overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-semibold text-navy flex items-center justify-between hover:bg-sand/50 transition-colors"
                >
                  {faq.q}
                  <span className="w-7 h-7 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0 ml-4">
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-navy-soft text-sm leading-relaxed border-t border-sand-deep/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <LandingFooter />
      <MobileCallBar />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}