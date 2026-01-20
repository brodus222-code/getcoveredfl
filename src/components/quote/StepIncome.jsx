import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function StepIncome({ data, onChange, onNext, onBack }) {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    onChange({ estimated_income: value ? parseInt(value) : '' });
  };
  
  const formatIncome = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
          <DollarSign className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          What's your estimated household income for the year?
        </h2>
        <p className="text-gray-600">
          This helps determine which plans and savings you may qualify for.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 font-medium">
            $
          </span>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={formatIncome(data.estimated_income)}
            onChange={handleChange}
            className="text-center text-2xl py-6 h-16 pl-10 font-semibold border-2 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        <p className="text-sm text-gray-500 mt-3 text-center">
          Annual household income before taxes
        </p>
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
          disabled={!data.estimated_income}
          className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}