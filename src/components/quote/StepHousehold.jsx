import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

const householdOptions = [1, 2, 3, 4, 5];

export default function StepHousehold({ data, onChange, onNext, onBack }) {
  const handleSelect = (size) => {
    onChange({ household_size: size });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 mb-6">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Tell us about your household
        </h2>
        <p className="text-gray-600">
          This helps us check eligibility and available savings.
        </p>
      </div>
      
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-4">
          How many people are in your household?
        </p>
        <div className="grid grid-cols-5 gap-3">
          {householdOptions.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSelect(size)}
              className={`
                relative h-16 rounded-xl font-semibold text-lg transition-all duration-200
                ${data.household_size === size 
                  ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25 scale-105' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {size}{size === 5 ? '+' : ''}
            </button>
          ))}
        </div>
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
          disabled={!data.household_size}
          className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}