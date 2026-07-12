import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, FileCheck, ClipboardCheck, Users, HeartHandshake, ArrowRight, Shield } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SiteHeader from '@/components/shared/SiteHeader';
import TrustBar from '@/components/shared/TrustBar';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

const nextSteps = [
  { icon: FileCheck, title: 'We review your information' },
  { icon: ClipboardCheck, title: 'We compare plans and pricing in your area' },
  { icon: Users, title: 'We help you understand your options' },
  { icon: HeartHandshake, title: 'We guide you through enrollment if you choose a plan' },
];

const qualifications = [
  'Affordable ACA Marketplace plans',
  'COBRA alternatives',
  'Short-term or gap coverage',
  'PPO and broad-network plans',
  'First-time coverage options',
  'The most economical plans available in your ZIP code',
];

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <SiteHeader variant="light" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-deep to-navy text-white py-12 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-turquoise/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20"
          >
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading text-balance"
          >
            Thank You — We're Reviewing Your Information
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10"
          >
            A licensed advisor from HealthLink Insurance Agency LLC will contact you shortly to help you compare plans and choose the best option for your needs and budget.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
          >
            <Phone className="w-6 h-6 text-accent" />
            <div className="text-left">
              <p className="text-sm text-white/70">Need help immediately?</p>
              <a href="tel:+18555925924" className="text-xl font-bold hover:text-accent transition-colors font-heading">
                Call Now: (855) 592-5924
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      {/* What Happens Next */}
      <section className="py-12 md:py-20 bg-sand">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-8 md:mb-12 font-heading">
            What Happens Next
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-soft border border-sand-deep/40"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-soft flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Step {index + 1}
                  </span>
                  <p className="font-medium text-navy mt-1">{step.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* While You Wait */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary-soft to-turquoise-soft rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-4 font-heading">
              While You Wait
            </h2>
            <p className="text-navy-soft text-center mb-8 max-w-2xl mx-auto">
              You may qualify for:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {qualifications.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-soft"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-navy-soft">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link
            to={createPageUrl('Home')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-primary text-primary font-semibold hover:bg-primary-soft transition-colors"
          >
            Return to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileCallBar />
    </div>
  );
}