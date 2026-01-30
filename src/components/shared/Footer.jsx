import React from 'react';
import { Phone, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-teal-500" />
            <span className="text-xl font-bold text-white">GetCoveredFL</span>
          </div>
          
          <a 
            href="tel:+18555925924" 
            className="flex items-center gap-2 text-white hover:text-teal-400 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">(855) 592-5924</span>
          </a>
        </div>
        
        <div className="pt-8 space-y-4 text-sm">
          <p>
            <strong className="text-gray-300">GetCoveredFL</strong> is powered by HealthLink Insurance Agency LLC.
          </p>
          <p>
            Licensed health insurance agents available to assist with plan comparisons and enrollment.
          </p>
          <p>
            No cost for assistance. No obligation to enroll.
          </p>
          <p className="text-gray-500">
            This website is not affiliated with Healthcare.gov or any government agency.
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} HealthLink Insurance Agency LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}