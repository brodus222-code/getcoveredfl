import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import {
  Shield, ArrowRight, Plus, Minus, Lightbulb,
  DollarSign, Wallet, Coins, Percent, ShieldCheck,
  Building2, Pill, Heart, Landmark, FileCheck
} from 'lucide-react';
import SiteHeader from '@/components/shared/SiteHeader';
import TrustBar from '@/components/shared/TrustBar';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

const terms = [
  {
    icon: DollarSign,
    term: 'Premium',
    definition: 'The fixed amount you pay each month to keep your coverage active — like a subscription.',
    example: 'Many Floridians pay $0–$50/month after ACA subsidies are applied.',
  },
  {
    icon: Wallet,
    term: 'Deductible',
    definition: 'The amount you pay out of pocket for covered care before your insurance begins sharing costs.',
    example: 'With a $1,500 deductible, you pay the first $1,500 of covered services yourself.',
  },
  {
    icon: Coins,
    term: 'Copay',
    definition: 'A set dollar amount you pay at the time of a visit or service. Your plan covers the rest.',
    example: 'A $25 copay for a primary-care visit — you pay $25, insurance pays the balance.',
  },
  {
    icon: Percent,
    term: 'Coinsurance',
    definition: 'Your share of the bill (a percentage) after you have met your deductible.',
    example: 'With 20% coinsurance on a $200 service, you pay $40 and insurance pays $160.',
  },
  {
    icon: ShieldCheck,
    term: 'Out-of-Pocket Maximum',
    definition: 'The most you will pay for covered services in a plan year. Once reached, your plan pays 100%.',
    example: 'If your max is $8,700, once your deductibles + copays + coinsurance hit that, insurance covers everything else.',
  },
  {
    icon: Building2,
    term: 'Provider Network',
    definition: 'The doctors, hospitals, and pharmacies that have agreed to accept your plan at lower rates.',
    example: 'Staying in-network saves thousands vs. out-of-network care for the same service.',
  },
  {
    icon: Pill,
    term: 'Formulary',
    definition: 'Your plan\'s list of covered prescription drugs, organized into cost tiers.',
    example: 'A generic drug may be a $10 copay (Tier 1); a brand-name drug may be $45 (Tier 2).',
  },
  {
    icon: Heart,
    term: 'Essential Health Benefits',
    definition: 'The 10 categories of care every ACA-compliant plan must cover — no surprise gaps.',
    example: 'Includes doctor visits, prescriptions, hospital stays, maternity, mental health, and more.',
  },
  {
    icon: Landmark,
    term: 'HSA (Health Savings Account)',
    definition: 'A tax-advantaged savings account for medical expenses, paired with high-deductible plans.',
    example: 'Money goes in tax-free, grows tax-free, and comes out tax-free for qualified medical costs.',
  },
  {
    icon: FileCheck,
    term: 'Prior Authorization',
    definition: 'When your plan requires approval before covering certain drugs, tests, or procedures.',
    example: 'Your doctor may need insurer approval before a costly MRI or specialty drug is covered.',
  },
];

const metalTiers = [
  { tier: 'Bronze', accent: 'border-l-amber-400', dot: 'bg-amber-400', premium: 'Lowest', oop: 'Highest', best: 'healthy and rarely see a doctor' },
  { tier: 'Silver', accent: 'border-l-slate-400', dot: 'bg-slate-400', premium: 'Balanced', oop: 'Moderate', best: 'looking for the best value with cost-sharing savings' },
  { tier: 'Gold', accent: 'border-l-yellow-400', dot: 'bg-yellow-400', premium: 'Higher', oop: 'Lower', best: 'using healthcare often or taking prescriptions' },
  { tier: 'Platinum', accent: 'border-l-cyan-400', dot: 'bg-cyan-400', premium: 'Highest', oop: 'Lowest', best: 'managing frequent care or chronic conditions' },
];

const costFlow = [
  { step: '1', label: 'Premium', detail: 'You pay this every month, whether you use care or not.' },
  { step: '2', label: 'Copay', detail: 'Fixed dollar amounts for routine visits and prescriptions.' },
  { step: '3', label: 'Deductible', detail: 'For bigger services, you pay until your deductible is met.' },
  { step: '4', label: 'Coinsurance', detail: 'After the deductible, you share a percentage of each bill.' },
  { step: '5', label: 'Out-of-Pocket Max', detail: 'Once hit, insurance pays 100% of covered care for the year.' },
];

const faqs = [
  {
    q: 'What is the difference between a copay and coinsurance?',
    a: 'A copay is a fixed dollar amount (e.g., $25 per visit). Coinsurance is a percentage of the bill (e.g., 20%) that you pay after meeting your deductible.',
  },
  {
    q: 'Does a lower premium mean lower total costs?',
    a: 'Not always. Plans with low monthly premiums often have higher deductibles and out-of-pocket costs. If you use healthcare frequently, a plan with a slightly higher premium but lower deductible may save you money overall.',
  },
  {
    q: 'What happens after I reach my out-of-pocket maximum?',
    a: 'Your insurance plan pays 100% of covered essential health benefits for the rest of the plan year. You still pay your monthly premium, but no more deductibles, copays, or coinsurance for covered services.',
  },
  {
    q: 'Are preventive services really free?',
    a: 'Yes. ACA-compliant plans cover preventive care — like annual checkups, screenings, and vaccines — at no cost to you, even before you meet your deductible, as long as you use an in-network provider.',
  },
];

const tips = [
  'A low premium doesn\'t always mean low total cost — check the deductible too.',
  'Preventive care is free on every ACA plan, before your deductible.',
  'Silver plans offer extra savings (lower deductibles and copays) if your income qualifies.',
  'Always check if your doctor and medications are in-network before enrolling.',
];

export default function CoverageGuide() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-deep to-navy text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-turquoise/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">Plain-English Insurance Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 tracking-tight font-heading text-balance">
            Insurance Terms, <span className="text-accent">Explained Simply</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Deductibles, copays, coinsurance — learn what they mean so you can choose a plan with confidence.
          </p>
          <Link
            to={createPageUrl('Quote')}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-glow-accent transition-all hover:-translate-y-0.5"
          >
            Find My Plan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <TrustBar />

      {/* Terms Grid */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Key Terminology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
              The 10 terms every shopper should know
            </h2>
            <p className="text-navy-soft max-w-2xl mx-auto">
              Understanding these words is the difference between guessing and choosing with confidence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {terms.map((t, i) => (
              <motion.div
                key={t.term}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.1 }}
                className="bg-sand border border-sand-deep/40 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-soft flex items-center justify-center">
                    <t.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy font-heading mb-1">{t.term}</h3>
                    <p className="text-sm text-navy-soft leading-relaxed mb-3">{t.definition}</p>
                    <p className="text-xs text-primary bg-primary-soft/50 rounded-lg px-3 py-2 leading-relaxed">
                      <span className="font-semibold">Example: </span>{t.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How costs flow */}
      <section className="py-16 md:py-20 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading">
              How your costs flow through the year
            </h2>
            <p className="text-navy-soft">From your first premium payment to hitting your out-of-pocket max.</p>
          </div>

          <div className="space-y-0">
            {costFlow.map((item, i) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm font-heading flex-shrink-0">
                    {item.step}
                  </div>
                  {i < costFlow.length - 1 && (
                    <div className="w-px h-16 bg-primary/30 mt-1" />
                  )}
                </div>
                <div className="bg-white rounded-2xl border border-sand-deep/40 px-5 py-4 flex-1 mb-3 shadow-soft">
                  <span className="font-bold text-navy font-heading">{item.label}</span>
                  <p className="text-sm text-navy-soft mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metal Tiers */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              ACA Plan Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading">
              Metal tiers: Bronze, Silver, Gold, Platinum
            </h2>
            <p className="text-navy-soft max-w-2xl mx-auto">
              The tier affects how you split costs with the insurer — not the quality of care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metalTiers.map((tier) => (
              <div key={tier.tier} className={`bg-white rounded-2xl border ${tier.accent} border-y border-r border-sand-deep/40 p-6 shadow-soft`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${tier.dot}`} />
                  <h3 className="text-lg font-bold text-navy font-heading">{tier.tier}</h3>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-navy-soft">Premium</dt>
                    <dd className="font-semibold text-navy">{tier.premium}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-soft">Out-of-pocket</dt>
                    <dd className="font-semibold text-navy">{tier.oop}</dd>
                  </div>
                </dl>
                <p className="text-xs text-navy-soft mt-4 pt-4 border-t border-sand-deep/40 leading-relaxed">
                  Best if you are <span className="font-medium text-navy">{tier.best}</span>.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 px-6 bg-sand">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3 text-center w-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10 font-heading">
            Common Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-sand-deep/40 overflow-hidden shadow-soft"
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

      {/* Tips */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary-soft to-turquoise-soft rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy font-heading">
                Quick Tips
              </h2>
            </div>
            <ul className="space-y-3">
              {tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 bg-white rounded-2xl px-5 py-4 shadow-soft">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-navy-soft text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
      <MobileCallBar />
    </div>
  );
}