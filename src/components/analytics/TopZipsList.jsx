import React from 'react';

export default function TopZipsList({ rows, total }) {
  if (!rows.length) return <p className="text-sm text-muted-foreground">No ZIP data yet.</p>;
  const max = rows[0].count || 1;
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.zip} className="flex items-center gap-3">
          <span className="w-14 text-sm font-medium text-navy">{r.zip}</span>
          <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${(r.count / max) * 100}%` }} />
          </div>
          <span className="w-16 text-right text-xs text-muted-foreground">
            {r.count} · {total ? Math.round((r.count / total) * 100) : 0}%
          </span>
        </div>
      ))}
    </div>
  );
}