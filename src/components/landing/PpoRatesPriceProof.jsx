import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const examples = [
  {
    who: 'Single, age 31',
    detail: 'Non-smoker, healthy',
    price: '$89',
    perks: ['No referrals needed', 'Nationwide PPO network', 'Telehealth included'],
    featured: false,
  },
  {
    who: 'Couple, ages 38 & 40',
    detail: 'Self-employed, no subsidy',
    price: '$164',
    perks: ['Both adults covered', 'Keep your own doctors', 'Start as soon as next month'],
    featured: true,
  },
  {
    who: 'Family of 4',
    detail: 'Business owner household',
    price: '$248',
    perks: ['Kids covered', 'Dental & vision add-ons', 'Enroll year-round'],
    featured: false,
  },
];

export default function PpoRatesPriceProof() {
  return (
    <section className="py-14 md:py-20 bg-sand">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Real Florida Examples
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading text-balance">
            Why private PPO plans begin at $89 a month
          </h2>
          <p className="text-base md:text-lg text-navy-soft max-w-2xl mx-auto">
            Private plans are priced on your age, ZIP code, and coverage level — not your income. That is why many Floridians who earn too much for a subsidy still pay less here.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {examples.map((ex, i) => (
            <motion.div
              key={ex.who}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className={`rounded-3xl p-6 md:p-7 border shadow-soft bg-white ${
                ex.featured ? 'border-accent ring-2 ring-accent/30' : 'border-sand-deep/50'
              }`}
            >
              {ex.featured && (
                <span className="inline-block text-xs font-bold uppercase tracking-wide text-accent-deep bg-accent-soft rounded-full px-3 py-1 mb-3">
                  Most Common
                </span>
              )}
              <p className="font-semibold text-navy font-heading">{ex.who}</p>
              <p className="text-sm text-navy-soft">{ex.detail}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold text-navy font-heading">{ex.price}</span>
                <span className="text-navy-soft pb-1">/month</span>
              </div>
              <ul className="mt-5 space-y-2">
                {ex.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-navy-soft">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-xs text-navy-soft/80 text-center max-w-3xl mx-auto leading-relaxed">
          Example premiums are for illustration only. Private PPO pricing depends on your ZIP code, age, tobacco use, household, plan design, and carrier underwriting. Private plans are not ACA Marketplace plans and are not eligible for premium tax credits. Availability varies.
        </p>
      </div>
    </section>
  );
}