import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function StepZipCode({ data, onChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.zip_code && data.zip_code.length === 5) {
      onNext();
    }
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
          <MapPin className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          What's your ZIP code?
        </h2>
        <p className="text-gray-600">
          We'll show plans and prices available in your area.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="Enter ZIP code"
            value={data.zip_code || ''}
            onChange={(e) => onChange({ zip_code: e.target.value.replace(/\D/g, '').slice(0, 5) })}
            className="text-center text-2xl py-6 h-16 font-semibold tracking-widest border-2 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={!data.zip_code || data.zip_code.length !== 5}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          Continue
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-2">Prefer to speak with someone?</p>
        <a 
          href="tel:+18555925924" 
          className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call Now: (855) 592-5924
        </a>
      </div>
    </motion.div>
  );
}