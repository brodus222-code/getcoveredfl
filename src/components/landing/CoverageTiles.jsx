import React from 'react';
import { Shield, RefreshCw, Clock, UserPlus, Building2, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const coverageOptions = [
  {
    icon: Shield,
    title: "Affordable ACA Marketplace Plans",
    description: "Compare plans, check subsidies, and review options available in your area.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: RefreshCw,
    title: "COBRA Alternatives",
    description: "Explore more affordable options that may cost less than traditional COBRA.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: Clock,
    title: "Short-Term & Gap Coverage",
    description: "Temporary plans designed to bridge coverage between jobs or life changes.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    icon: UserPlus,
    title: "First-Time Coverage Options",
    description: "Simple, guided help for Floridians getting insurance for the first time.",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Building2,
    title: "PPO & Broad Network Plans",
    description: "Review plans with wider doctor and hospital networks.",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600"
  },
  {
    icon: DollarSign,
    title: "Most Affordable Options",
    description: "See if you qualify for lower-cost plans based on your household and income.",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600"
  }
];

export default function CoverageTiles() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">
            Coverage Options
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find the Right Coverage for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore different paths to health insurance based on your unique situation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverageOptions.map((option, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={createPageUrl("Quote")}>
                <div className="group relative bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${option.bgColor} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                      <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                      {option.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {option.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-medium text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
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