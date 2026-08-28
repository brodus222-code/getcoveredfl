import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const examples = [
  {
    who: 'Single, age 27',
    income: '~$26,000/yr income',
    price: '$56',
    perks: ['Doctor visits', 'Prescriptions', 'Preventive care $0'],
    featured: false,
  },
  {
    who: 'Couple, ages 34 & 36',
    income: '~$38,000/yr income',
    price: '$74',
    perks: ['Two adults covered', 'Major carrier network', 'Free agent support'],
    featured: true,
  },
  {
    who: 'Family of 4',
    income: '~$55,000/yr income',
    price: '$98',
    perks: ['Kids covered', 'Dental options', 'Enroll same day'],
    featured: false,
  },
];

export default function RatesPriceProof() {
  return (
    <section className="py-14 md:py-20 bg-sand">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Real Florida Examples
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading text-balance">
            Why plans begin at $56 a month
          </h2>
          <p className="text-base md:text-lg text-navy-soft max-w-2xl mx-auto">
            Federal subsidies pay part of your premium based on your household size and income. Most Floridians qualify — and many never find out.
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
              className={`p-6 md:p-7 border-t-2 bg-white ${
                ex.featured ? 'border-accent bg-accent-soft' : 'border-primary'
              }`}
            >
              {ex.featured && (
                <span className="inline-block text-xs font-bold uppercase tracking-wide text-accent-deep bg-accent-soft rounded-full px-3 py-1 mb-3">
                  Most Common
                </span>
              )}
              <p className="font-semibold text-navy font-heading">{ex.who}</p>
              <p className="text-sm text-navy-soft">{ex.income}</p>
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
          Example premiums shown after estimated advance premium tax credits for illustration only. Your actual rate depends on your ZIP code, age, household size, income, and the plan you choose. Not everyone qualifies for a subsidy.
        </p>
      </div>
    </section>
  );
}