import React from 'react';
import { CheckCircle2, Headphones, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Headphones, title: 'Licensed Florida Advisors', description: 'Speak with experts who understand Florida\'s insurance landscape.' },
  { icon: Shield, title: 'All Major Carriers', description: 'Compare options from trusted insurance providers statewide.' },
  { icon: Award, title: 'No Cost Assistance', description: 'Our guidance is completely free with no obligation to enroll.' },
];

export default function AboutSection() {
  return (
    <section className="py-14 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              About GetCoveredFL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight font-heading text-balance">
              Your Trusted Partner for Health Coverage
            </h2>

            <p className="text-base md:text-lg text-navy-soft mb-6 leading-relaxed">
              GetCoveredFL helps Floridians compare health insurance options with clear guidance and licensed support. Whether you're reviewing ACA plans, COBRA alternatives, or temporary coverage, our advisors help you find the right fit at the best available price.
            </p>

            <div className="space-y-4">
              {[
                'Compare multiple plan options side by side',
                'Check your eligibility for subsidies and savings',
                'Get personalized recommendations based on your needs',
                'Enroll with confidence through licensed professionals',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-navy-soft">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-soft to-turquoise-soft rounded-3xl blur-2xl opacity-50" />

            <div className="relative grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-soft border border-sand-deep/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-deep flex items-center justify-center text-white shadow-glow-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1 font-heading">{feature.title}</h3>
                      <p className="text-sm text-navy-soft">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}