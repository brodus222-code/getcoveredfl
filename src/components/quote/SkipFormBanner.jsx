import React from 'react';
import { Phone } from 'lucide-react';

export default function SkipFormBanner() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-md border border-blue-100">
      <div className="bg-gradient-to-br from-sky-100 to-teal-50 flex flex-col sm:flex-row items-center gap-6 p-6">
        {/* Phone image */}
        <div className="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format"
            alt="Phone calling"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-blue-900 mb-1">
            Don't want to fill this out?
          </h3>
          <p className="text-xl text-gray-700 font-normal mb-2">
            We can <strong className="text-blue-800">call you</strong> instead.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            A licensed Florida agent can review your info and walk you through your options in minutes.
          </p>
          <a
            href="tel:+18555925924"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 text-sm"
          >
            <Phone className="w-4 h-4" />
            Skip the Form — Have an Agent Call Me
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-100 px-6 py-2 text-center text-xs text-gray-500">
        Licensed Florida agent — no call centers.
      </div>
    </div>
  );
}