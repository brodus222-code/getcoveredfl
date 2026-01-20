import React from 'react';
import { CheckCircle2, Headphones, Award, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Headphones,
    title: "Licensed Florida Advisors",
    description: "Speak with experts who understand Florida's insurance landscape"
  },
  {
    icon: Shield,
    title: "All Major Carriers",
    description: "Compare options from trusted insurance providers"
  },
  {
    icon: Award,
    title: "No Cost Assistance",
    description: "Our guidance is completely free with no obligation"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">
              About GetCoveredFL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Your Trusted Partner for Health Coverage
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              GetCoveredFL helps Floridians compare health insurance options with clear guidance and licensed support. Whether you're reviewing ACA plans, COBRA alternatives, or temporary coverage, our advisors help you find the right fit at the best available price.
            </p>
            
            <div className="space-y-4">
              {[
                "Compare multiple plan options side by side",
                "Check your eligibility for subsidies and savings",
                "Get personalized recommendations based on your needs",
                "Enroll with confidence through licensed professionals"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
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
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
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