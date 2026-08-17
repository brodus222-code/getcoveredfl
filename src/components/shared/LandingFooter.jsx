import React from 'react';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Trimmed footer for paid-traffic landing pages — required compliance
// disclosure and compliance page links only, no site navigation.
export default function LandingFooter() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-8 space-y-4 text-xs text-white/50">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link to={createPageUrl('Terms')} className="hover:text-white/80 transition-colors">Terms of Service</Link>
          <span className="text-white/20">|</span>
          <Link to={createPageUrl('Privacy')} className="hover:text-white/80 transition-colors">Privacy Policy</Link>
          <span className="text-white/20">|</span>
          <Link to={createPageUrl('Licensing')} className="hover:text-white/80 transition-colors">Licensing</Link>
        </div>

        <p className="text-white/70 font-medium">
          HealthLink Insurance Agency LLC · FL Lic# L131967 · NPN# 21554495
        </p>

        <p className="flex items-start gap-2">
          <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <span>
            This website is not affiliated with Healthcare.gov, CMS, or any government agency. We are an independent licensed insurance agency. Your information is secure and never sold.
          </span>
        </p>

        <p>© {new Date().getFullYear()} HealthLink Insurance Agency LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}