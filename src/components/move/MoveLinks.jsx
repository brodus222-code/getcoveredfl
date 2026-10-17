import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function MoveLinks({ crossLink }) {
  return (
    <section className="bg-sand py-10 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
        <Link to={crossLink.to} className="flex items-center justify-between bg-card border-l-2 border-accent p-5 text-navy font-semibold hover:text-primary">
          {crossLink.label} <ArrowRight className="w-5 h-5" />
        </Link>
        <Link to="/Marketplace" className="flex items-center justify-between bg-card border-l-2 border-accent p-5 text-navy font-semibold hover:text-primary">
          Florida Special Enrollment guide <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}