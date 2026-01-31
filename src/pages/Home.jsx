import React from 'react';
import { Shield } from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import CoverageTiles from "@/components/landing/CoverageTiles";
import AboutSection from "@/components/landing/AboutSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/shared/Footer";
import MobileCallBar from "@/components/shared/MobileCallBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-white" />
            <span className="text-lg font-bold text-white">GetCoveredFL</span>
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