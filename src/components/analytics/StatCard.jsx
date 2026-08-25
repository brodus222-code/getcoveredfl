import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-navy-soft text-xs font-semibold uppercase tracking-wide">
          {Icon && <Icon className="w-4 h-4 text-primary" />}
          {label}
        </div>
        <div className="mt-2 text-2xl font-bold font-heading text-navy">{value}</div>
        {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
      </CardContent>
    </Card>
  );
}