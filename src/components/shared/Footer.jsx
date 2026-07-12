import React from 'react';
import { Shield, Phone, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
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

        <div className="pt-8 grid md:grid-cols-2 gap-6 text-xs text-white/50">
          <div className="space-y-3">
            <p>
              This website is not affiliated with Healthcare.gov or any government agency. We are an independent licensed insurance agency.
            </p>
            <p className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Your information is secure and never sold.
            </p>
          </div>
          <div className="md:text-right">
            <p>© {new Date().getFullYear()} HealthLink Insurance Agency LLC. All rights reserved.</p>
            <div className="flex md:justify-end gap-4 mt-2">
              <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/80 transition-colors">Licensing</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}