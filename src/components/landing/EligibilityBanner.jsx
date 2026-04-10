import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function EligibilityBanner() {
  return (
    <div className="w-full bg-sky-100 py-4 px-4">
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col sm:flex-row items-center">
        {/* Image */}
        <div className="sm:w-2/5 w-full flex-shrink-0">
          <img
            src="https://media.base44.com/images/public/696f51421917c989be527824/f29d4326f_Floridaeligibility2.png"
            alt="Florida eligibility"
            className="w-full h-full object-cover object-top"
            style={{ maxHeight: '280px' }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8 text-center sm:text-left flex flex-col items-center sm:items-start justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 leading-snug mb-3">
            You may qualify for{' '}
            <span className="text-green-500">$0</span>
            <br />
            or low-cost{' '}
            <span className="text-blue-900">Marketplace plans</span>
          </h2>

          <hr className="w-full border-gray-200 mb-4" />

          <p className="text-gray-600 text-base mb-6 max-w-md leading-relaxed">
            Most Florida residents don't realize their savings change when income or household info changes —{' '}
            <strong>even slightly.</strong>
          </p>

          <Link to={createPageUrl('Quote')}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-md transition-colors duration-200 w-full sm:w-auto">
              Check My Eligibility
            </button>
          </Link>

          <p className="text-xs text-gray-400 mt-4">
            Independent licensed Florida agency — not a government site.
          </p>
        </div>
      </div>
    </div>
  );
}