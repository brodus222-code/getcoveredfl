import React from 'react';
import { MapPin, ClipboardList, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Enter your ZIP code",
    description: "We'll find plans available in your specific Florida area"
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Answer a few simple questions",
    description: "Help us understand your coverage needs and budget"
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "See plans, prices, and coverage options",
    description: "Compare your personalized options side by side"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your personalized insurance options in just three easy steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-teal-200 to-transparent" />
              )}
              
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-teal-200 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5">
                <div className="absolute -top-4 -left-4 text-6xl font-bold text-teal-100/50 select-none">
                  {step.number}
                </div>
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white mb-6 shadow-lg shadow-teal-500/20">
                    <step.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
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