import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function SiteHeader({ variant = 'light' }) {
  const isTransparent = variant === 'transparent';

  return (
    <header
      className={
        isTransparent
          ? 'absolute top-0 left-0 right-0 z-50'
          : 'sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-sand-deep/60'
      }
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
        <Link to={createPageUrl('Home')} className="flex items-center gap-2.5 group">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${isTransparent ? 'bg-white/15 backdrop-blur-sm' : 'bg-primary'}`}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className={`text-lg font-bold font-heading tracking-tight ${isTransparent ? 'text-white' : 'text-navy'}`}>
            GetCovered<span className="text-accent">FL</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+18556345343"
            className={`flex items-center gap-2 font-semibold transition-colors ${isTransparent ? 'text-white hover:text-accent' : 'text-navy hover:text-primary'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center animate-call-pulse ${isTransparent ? 'bg-white/15' : 'bg-accent-soft'}`}>
              <Phone className={`w-4 h-4 ${isTransparent ? 'text-white' : 'text-accent'}`} />
            </div>
            <span className="hidden sm:inline text-sm">(855) 634-5343</span>
          </a>
        </div>
      </div>
    </header>
  );
}