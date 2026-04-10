import React, { useState, useEffect } from 'react';
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import HeroSection from "@/components/landing/HeroSection";

import HowItWorks from "@/components/landing/HowItWorks";
import CoverageTiles from "@/components/landing/CoverageTiles";
import AboutSection from "@/components/landing/AboutSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/shared/Footer";
import MobileCallBar from "@/components/shared/MobileCallBar";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await base44.auth.me();
        console.log('Home page - User:', user);
        console.log('Home page - Is Admin?:', user?.role === 'admin');
        setIsAdmin(user?.role === 'admin');
      } catch (error) {
        console.log('Home page - Auth error:', error);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-7 h-7 text-white" />
              <span className="text-lg font-bold text-white">GetCoveredFL</span>
            </div>
            {isAdmin && (
              <Link 
                to={createPageUrl('LeadManagement')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg"
              >
                Lead Management
              </Link>
            )}
          </div>
        </div>
      </header>

      <HeroSection />
      <HowItWorks />
      <CoverageTiles />
      <AboutSection />
      <FinalCTA />
      <Footer />
      <MobileCallBar />
    </div>
  );
}