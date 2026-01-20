import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Check } from "lucide-react";
import { motion } from "framer-motion";

const questions = [
  {
    key: "currently_insured",
    question: "Are you currently insured?"
  },
  {
    key: "takes_prescriptions",
    question: "Do you take any regular prescriptions?"
  },
  {
    key: "prefers_specific_network",
    question: "Do you prefer a specific doctor or hospital network?"
  }
];

export default function StepHealth({ data, onChange, onNext, onBack }) {
  const handleSelect = (key, value) => {
    onChange({ [key]: value });
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
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          A few quick questions
        </h2>
        <p className="text-gray-600">
          This helps us match you with the right plans.
        </p>
      </div>
      
      <div className="space-y-6 mb-8">
        {questions.map((q) => (
          <div key={q.key} className="space-y-3">
            <p className="font-medium text-gray-900">{q.question}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: true, label: "Yes" },
                { value: false, label: "No" }
              ].map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => handleSelect(q.key, option.value)}
                  className={`
                    relative py-4 px-6 rounded-xl font-medium transition-all duration-200
                    ${data[q.key] === option.value 
                      ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {option.label}
                  {data[q.key] === option.value && (
                    <span className="absolute top-2 right-2">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </button>
              ))}
            </div>
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
          className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}