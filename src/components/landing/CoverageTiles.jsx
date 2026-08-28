import React from 'react';
import { Shield, RefreshCw, Clock, UserPlus, Building2, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const coverageOptions = [
  { icon: Shield, title: 'ACA Marketplace Plans', description: 'Compare subsidized plans with essential health benefits.' },
  { icon: RefreshCw, title: 'COBRA Alternatives', description: 'Often more affordable options than staying on COBRA.' },
  { icon: Clock, title: 'Short-Term & Gap Coverage', description: 'Temporary plans that bridge gaps between jobs or life events.' },
  { icon: UserPlus, title: 'First-Time Coverage', description: 'Guided help for Floridians getting insured for the first time.' },
  { icon: Building2, title: 'PPO & Broad Network Plans', description: 'Wider doctor and hospital networks across Florida.' },
  { icon: DollarSign, title: 'Most Affordable Options', description: 'See if you qualify for lower-cost plans based on income.' },
];

export default function CoverageTiles() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-sm font-bold text-accent-deep uppercase tracking-[0.18em] mb-3">
            Coverage Options
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading text-balance">
            Find the Right Coverage for You
          </h2>
          <p className="text-base md:text-lg text-navy-soft max-w-2xl mx-auto">
            Explore different paths to health insurance based on your unique situation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coverageOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Link to={createPageUrl('Quote')} className="block h-full">
                <div className="group relative bg-sand p-5 md:p-7 h-full border-t-2 border-accent transition-colors duration-200 hover:bg-accent-soft">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-navy text-white mb-5">
                    <option.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-navy mb-2 font-heading group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>

                  <p className="text-navy-soft text-sm leading-relaxed mb-4">
                    {option.description}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-primary">
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}