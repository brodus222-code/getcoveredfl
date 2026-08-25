import React from 'react';

const COLORS = {
  new: 'bg-blue-500',
  contacted: 'bg-yellow-500',
  quoted: 'bg-purple-500',
  enrolled: 'bg-green-600',
  closed: 'bg-gray-400',
};

export default function StatusFunnel({ data, total }) {
  return (
    <div className="space-y-3">
      {data.map((row) => {
        const pct = total ? Math.round((row.count / total) * 100) : 0;
        return (
          <div key={row.status}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="capitalize font-medium text-navy">{row.status}</span>
              <span className="text-muted-foreground">{row.count} · {pct}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${COLORS[row.status]}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}