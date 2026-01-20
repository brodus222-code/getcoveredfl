import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, Clock, UserPlus, Building2, DollarSign, Check } from "lucide-react";
import { motion } from "framer-motion";

const coverageOptions = [
  {
    id: "aca_marketplace",
    icon: Shield,
    title: "Affordable ACA Marketplace Plans",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "cobra_alternatives",
    icon: RefreshCw,
    title: "COBRA Alternatives",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "short_term_gap",
    icon: Clock,
    title: "Short-Term or Gap Coverage",
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    id: "first_time_coverage",
    icon: UserPlus,
    title: "First-Time Coverage Options",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    id: "ppo_broad_network",
    icon: Building2,
    title: "PPO & Broad Network Plans",
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  },
  {
    id: "most_affordable",
    icon: DollarSign,
    title: "Most Affordable Options",
    color: "text-rose-600",
    bgColor: "bg-rose-50"
  }
];

export default function StepCoverage({ data, onChange, onNext, onBack }) {
  const handleSelect = (coverageType) => {
    onChange({ coverage_type: coverageType });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          What type of coverage are you looking for?
        </h2>
        <p className="text-gray-600">
          Select the option that best fits your needs.
        </p>
      </div>
      
      <div className="space-y-3 mb-6">
        {coverageOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${data.coverage_type === option.id 
                ? 'border-teal-500 bg-teal-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${option.bgColor} flex items-center justify-center`}>
              <option.icon className={`w-5 h-5 ${option.color}`} />
            </div>
            <span className="flex-1 font-medium text-gray-900">{option.title}</span>
            {data.coverage_type === option.id && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex gap-3">
        <Button 
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 text-lg font-medium rounded-xl"
        >
          Back
        </Button>
        <Button 
          type="button"
          onClick={onNext}
          disabled={!data.coverage_type}
          className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}