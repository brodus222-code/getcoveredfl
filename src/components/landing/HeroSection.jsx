import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, Shield, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-100">Florida's Trusted Health Insurance Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Find Affordable Health Insurance in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
              Florida
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-teal-100/90 mb-10 leading-relaxed max-w-2xl">
            Compare plans, explore alternatives, and choose coverage that fits your needs and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to={createPageUrl("Quote")}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
              >
                Start With My ZIP Code
              </Button>
            </Link>
            
            <a 
              href="tel:+18005551234" 
              className="flex items-center justify-center gap-2 text-white/90 hover:text-white font-medium transition-colors group"
            >
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span>Or Call Now: (800) 555-1234</span>
            </a>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-teal-200/80">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              No fees
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              No obligation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Licensed Florida advisors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}