import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

export default function Header({ showBackButton = false }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696f51421917c989be527824/3a5e8e058_IMG_8862.png" 
              alt="GetCoveredFL - Powered by HealthLink" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>
          
          {showBackButton && (
            <Link 
              to={createPageUrl("Home")} 
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}