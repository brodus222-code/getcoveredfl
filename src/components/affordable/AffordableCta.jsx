import React from 'react';
import AffordableZipForm from '@/components/affordable/AffordableZipForm';

export default function AffordableCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-20 text-center">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-primary-deep/40 via-transparent to-primary/20" />
      <div className="relative max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight text-white text-balance mb-5">See what affordable looks like in your ZIP code.</h2>
        <p className="text-lg text-white/75 leading-8 max-w-2xl mx-auto mb-8">Compare your Florida options in about 2 minutes. It is free, secure, and there is no obligation to enroll.</p>
        <AffordableZipForm compact />
      </div>
    </section>
  );
}