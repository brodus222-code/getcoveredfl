import React from 'react';
import { CheckCircle2, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

export default function StepConfirmation({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6"
      >
        <CheckCircle2 className="w-10 h-10" />
      </motion.div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Thank you — your information has been submitted!
      </h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        A licensed advisor from HealthLink Insurance Agency LLC will review your details and reach out shortly to help you compare plans and choose the best option.
      </p>
      
      <div className="bg-teal-50 rounded-2xl p-6 mb-8">
        <p className="text-sm font-medium text-teal-800 mb-3">Want help right now?</p>
        <a 
          href="tel:+18555925924" 
          className="inline-flex items-center gap-2 text-teal-600 font-semibold text-lg hover:text-teal-700 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Call Now: (855) 592-5924
        </a>
      </div>
      
      <Link to={createPageUrl("ThankYou")}>
        <Button 
          variant="outline"
          className="w-full py-5 text-lg font-medium rounded-xl"
        >
          View More Information
        </Button>
      </Link>
    </motion.div>
  );
}