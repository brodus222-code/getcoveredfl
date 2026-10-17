import React from 'react';

export default function NumberedList({ items }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4 bg-card border border-border p-5">
          <span className="w-9 h-9 shrink-0 bg-navy text-accent font-bold flex items-center justify-center">{i + 1}</span>
          <div>
            <h3 className="font-semibold text-navy">{item.title}</h3>
            <p className="text-navy-soft mt-1">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}