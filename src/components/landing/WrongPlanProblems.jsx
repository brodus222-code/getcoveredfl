import React from 'react';
import { motion } from 'framer-motion';
import { UserX, Pill, Layers, Network } from 'lucide-react';

const problems = [
  {
    icon: UserX,
    title: 'Your doctor isn\'t covered',
    desc: 'You found out after enrolling that your primary care doctor or specialist is out of network.',
  },
  {
    icon: Pill,
    title: 'Prescriptions cost too much',
    desc: 'Your medications landed on a high tier — or aren\'t on the plan\'s drug list at all.',
  },
  {
    icon: Layers,
    title: 'Wrong metal tier',
    desc: 'You picked Bronze to save on premium and got hit with a deductible you can\'t afford.',
  },
  {
    icon: Network,
    title: 'Missed the better network',
    desc: 'A different carrier offered the same price with your hospital system included.',
  },
];

export default function WrongPlanProblems() {
  return (
    <section className="py-12 md:py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Sound Familiar?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 font-heading text-balance">
            Picked the wrong plan on Healthcare.gov?
          </h2>
          <p className="text-navy-soft">
            You're not stuck with it. A licensed Florida agent can review your enrollment and correct it — at no cost to you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {problems.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 bg-sand border border-sand-deep/40 rounded-2xl p-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-sand-deep/40 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1 font-heading">{title}</h3>
                <p className="text-sm text-navy-soft leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}