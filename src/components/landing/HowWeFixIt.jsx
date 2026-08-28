import React from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    label: 'Step 1',
    title: 'We review your enrollment',
    desc: 'Tell us your ZIP or take a quick call. We look at the plan you picked, your doctors, and your prescriptions.',
  },
  {
    icon: RefreshCw,
    label: 'Step 2',
    title: 'We find the right fit',
    desc: 'We compare every carrier available in your county to find a plan that actually covers your care.',
  },
  {
    icon: ShieldCheck,
    label: 'Step 3',
    title: 'We correct it for you',
    desc: 'Your agent handles the Marketplace changes directly — no re-doing the application yourself.',
  },
];

export default function HowWeFixIt() {
  return (
    <section className="py-12 md:py-20 px-6 bg-sand">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            How We Fix It
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy font-heading text-balance">
            Three steps to the right plan
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, label, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border-t-2 border-accent p-7"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-navy text-white mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-accent-deep uppercase tracking-wider mb-1">{label}</div>
              <h3 className="text-lg font-bold text-navy mb-2 font-heading">{title}</h3>
              <p className="text-sm text-navy-soft leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}