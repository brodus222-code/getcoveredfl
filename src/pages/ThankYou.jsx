import React from 'react';
import { CheckCircle2, Phone, Shield, FileCheck, Users, ClipboardCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import Footer from '@/components/shared/Footer';
import MobileCallBar from '@/components/shared/MobileCallBar';

const nextSteps = [
  {
    icon: FileCheck,
    title: "We review your information"
  },
  {
    icon: ClipboardCheck,
    title: "We compare plans and pricing in your area"
  },
  {
    icon: Users,
    title: "We help you understand your options"
  },
  {
    icon: HeartHandshake,
    title: "We guide you through enrollment if you choose a plan"
  }
];

const qualifications = [
  "Affordable ACA Marketplace plans",
  "COBRA alternatives",
  "Short-term or gap coverage",
  "PPO and broad-network plans",
  "First-time coverage options",
  "The most economical plans available in your ZIP code"
];

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-teal-600" />
            <span className="text-lg font-bold text-gray-900">GetCoveredFL</span>
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Thank You — We're Reviewing Your Information
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-teal-100/90 max-w-2xl mx-auto mb-10"
          >
            A licensed advisor from HealthLink Insurance Agency LLC will contact you shortly to help you compare plans and choose the best option for your needs and budget.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
          >
            <Phone className="w-6 h-6 text-emerald-400" />
            <div className="text-left">
              <p className="text-sm text-teal-200">Need help immediately?</p>
              <a href="tel:+18555925924" className="text-xl font-bold hover:text-emerald-300 transition-colors">
                Call Now: (855) 592-5924
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* What Happens Next */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            What Happens Next
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Step {index + 1}
                  </span>
                  <p className="font-medium text-gray-900 mt-1">{step.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* While You Wait */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
              While You Wait
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
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
                  className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link to={createPageUrl("Home")}>
            <Button 
              variant="outline"
              className="gap-2 px-8 py-6 text-lg font-medium rounded-xl"
            >
              Return to Home
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
      <MobileCallBar />
    </div>
  );
}