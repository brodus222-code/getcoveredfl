import React from 'react';

export default function CompareTable({ rows }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-navy text-white">
          <tr>
            <th className="p-3"></th>
            <th className="p-3">Covered California</th>
            <th className="p-3 text-accent">Florida (Florida Blue)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, ca, fl]) => (
            <tr key={label} className="border-t border-border bg-card">
              <td className="p-3 font-semibold text-navy">{label}</td>
              <td className="p-3 text-navy-soft">{ca}</td>
              <td className="p-3 text-navy">{fl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}