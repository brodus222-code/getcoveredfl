import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Phone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function StepContact({ data, onChange, onSubmit, onBack, isSubmitting }) {
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validatePhone = (phone) => {
    return phone.replace(/\D/g, '').length >= 10;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!data.full_name?.trim()) {
      newErrors.full_name = "Please enter your name";
    }
    if (!data.phone || !validatePhone(data.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!data.email || !validateEmail(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };
  
  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
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
          <Send className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Almost done!
        </h2>
        <p className="text-gray-600">
          Where should we send your plan results?
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <Input
            type="text"
            placeholder="Full Name"
            value={data.full_name || ''}
            onChange={(e) => {
              onChange({ full_name: e.target.value });
              if (errors.full_name) setErrors({ ...errors, full_name: null });
            }}
            className={`py-5 h-14 text-lg border-2 ${errors.full_name ? 'border-red-300 focus:border-red-500' : 'focus:border-teal-500'}`}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>
          )}
        </div>
        
        <div>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={data.phone || ''}
            onChange={(e) => {
              onChange({ phone: formatPhone(e.target.value) });
              if (errors.phone) setErrors({ ...errors, phone: null });
            }}
            className={`py-5 h-14 text-lg border-2 ${errors.phone ? 'border-red-300 focus:border-red-500' : 'focus:border-teal-500'}`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={data.email || ''}
            onChange={(e) => {
              onChange({ email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            className={`py-5 h-14 text-lg border-2 ${errors.email ? 'border-red-300 focus:border-red-500' : 'focus:border-teal-500'}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button 
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 py-6 text-lg font-medium rounded-xl"
          >
            Back
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "See My Plans & Prices"
            )}
          </Button>
        </div>
      </form>
      
      <div className="text-center mb-6">
        <a 
          href="tel:+18005551234" 
          className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Or Call Now: (800) 555-1234
        </a>
      </div>
      
      <p className="text-xs text-gray-500 text-center leading-relaxed">
        By clicking "See My Plans & Prices," you agree to be contacted by a licensed agent from HealthLink Insurance Agency LLC about health insurance options. No purchase is required. Standard messaging rates may apply.
      </p>
    </motion.div>
  );
}