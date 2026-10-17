import React from 'react';

export default function MoveSection({ title, sand, children }) {
  return (
    <section className={`py-12 md:py-16 px-5 sm:px-6 ${sand ? 'bg-sand' : 'bg-background'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-navy font-heading mb-6 border-t-2 border-accent pt-4 inline-block">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}