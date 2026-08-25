import React from 'react';

export default function BooleanStatRow({ label, stats }) {
  const pct = (n) => (stats.total ? Math.round((n / stats.total) * 100) : 0);
  return (
    <div className="py-2 border-b border-border last:border-0">
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="font-medium text-navy">{label}</span>
        <span className="text-muted-foreground">Yes {stats.yes} · No {stats.no} · N/A {stats.unknown}</span>
      </div>
      <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-muted">
        <div className="h-full bg-primary" style={{ width: `${pct(stats.yes)}%` }} />
        <div className="h-full bg-accent" style={{ width: `${pct(stats.no)}%` }} />
      </div>
    </div>
  );
}