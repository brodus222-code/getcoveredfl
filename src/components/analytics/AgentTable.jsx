import React from 'react';

export default function AgentTable({ rows }) {
  if (!rows.length) return <p className="text-sm text-muted-foreground">No leads yet.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
            <th className="py-2 pr-4">Agent / Destination</th>
            <th className="py-2 pr-4">Leads</th>
            <th className="py-2 pr-4">Enrolled</th>
            <th className="py-2">Close Rate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.agent} className="border-b border-border last:border-0">
              <td className="py-2 pr-4 font-medium text-navy">{r.agent}</td>
              <td className="py-2 pr-4">{r.total}</td>
              <td className="py-2 pr-4">{r.enrolled}</td>
              <td className="py-2">{r.total ? Math.round((r.enrolled / r.total) * 100) : 0}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}