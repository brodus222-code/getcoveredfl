import React from 'react';
import { Shield, Phone, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold font-heading text-white">
                GetCovered<span className="text-accent">FL</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Powered by HealthLink Insurance Agency LLC — an independent licensed Florida insurance agency helping residents find affordable health coverage.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to={createPageUrl('Home')} className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to={createPageUrl('Quote')} className="hover:text-accent transition-colors">Get a Quote</Link></li>
              <li><Link to={createPageUrl('ACA')} className="hover:text-accent transition-colors">ACA Marketplace</Link></li>
              <li><Link to={createPageUrl('GetCovered')} className="hover:text-accent transition-colors">Check Eligibility</Link></li>
              <li><Link to="/coverage-guide" className="hover:text-accent transition-colors">Coverage Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Talk to a Licensed Agent</h4>
            <a
              href="tel:+18555925924"
              className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors mb-3"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span className="font-bold text-lg font-heading">(855) 592-5924</span>
            </a>
            <p className="text-xs text-white/50 leading-relaxed">
              Free consultation · No obligation · Licensed Florida agents available Mon–Sat
            </p>
          </div>
        </div>

        {/* Compliance Bar */}
        <div className="pt-8 border-t border-white/10 space-y-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to={createPageUrl('Terms')} className="hover:text-white/80 transition-colors">Terms of Service</Link>
            <span className="text-white/20">|</span>
            <Link to={createPageUrl('Privacy')} className="hover:text-white/80 transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link to={createPageUrl('Licensing')} className="hover:text-white/80 transition-colors">Licensing</Link>
          </div>

          <div className="space-y-2">
            <p className="text-white/70 font-medium">
              HealthLink Insurance Agency LLC · FL Lic# L131967 · NPN# 21554495
            </p>
            <p>
              AOR: Nick Loucks · FL Lic# G233885 · NPN# 21137267
            </p>
            <p className="flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>
                This website is not affiliated with Healthcare.gov, CMS, or any government agency. We are an independent licensed insurance agency. Your information is secure and never sold.
              </span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-2 pt-2">
            <p>© {new Date().getFullYear()} HealthLink Insurance Agency LLC. All rights reserved.</p>
            <p>contact@getcoveredfl.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}