import React from 'react';
import { MapPin, ClipboardList, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: MapPin,
    title: 'Enter your ZIP code',
    description: 'We instantly find plans available in your specific Florida area.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Answer a few quick questions',
    description: 'About 2 minutes — household, income, and what you need covered.',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Compare plans & enroll',
    description: 'A licensed agent reviews your options and helps you enroll — free.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-14 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading text-balance">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-navy-soft max-w-2xl mx-auto">
            Get your personalized insurance options in just three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="relative bg-gradient-to-br from-sand to-white rounded-3xl p-6 md:p-8 border border-sand-deep/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft hover:-translate-y-1">
                <div className="absolute -top-4 -left-4 text-6xl font-bold text-primary/10 select-none font-heading">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-white mb-6 shadow-glow-primary">
                    <step.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-semibold text-navy mb-3 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-navy-soft leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}