import React from 'react';
import { Award } from 'lucide-react';

const items = [
  'A+ rating',
  'BBB accredited business',
  'Customer recommended',
];

export default function TopRatedBadge() {
  return (
    <section className="py-10 md:py-14 px-6 bg-white">
      <div className="max-w-3xl mx-auto bg-sand border-t-2 border-accent px-6 py-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-accent flex items-center justify-center mb-5">
          <Award className="w-7 h-7 text-white" strokeWidth={1.75} />
        </div>
        <h3 className="text-base font-bold uppercase tracking-wide text-[#1D3557] mb-4 font-heading">
          Top-Rated Carriers
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="text-sm text-[#457B9D] font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}