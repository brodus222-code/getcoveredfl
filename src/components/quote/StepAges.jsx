import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export default function StepAges({ data, onChange, onNext, onBack }) {
  const householdSize = data.household_size || 1;
  const ages = data.ages || [];
  
  const handleAgeChange = (index, value) => {
    const newAges = [...ages];
    newAges[index] = value ? parseInt(value) : '';
    onChange({ ages: newAges });
  };
  
  const allAgesValid = ages.length === householdSize && ages.every(age => age && age > 0 && age < 120);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 mb-6">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          What are the ages of the people in your household?
        </h2>
        <p className="text-gray-600">
          Just the ages — no names needed.
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        {Array.from({ length: householdSize }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 w-20">
              Person {index + 1}
            </span>
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              max="120"
              placeholder="Age"
              value={ages[index] || ''}
              onChange={(e) => handleAgeChange(index, e.target.value)}
              className="flex-1 text-center text-lg py-5 h-14 font-medium border-2 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
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
          disabled={!allAgesValid}
          className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}