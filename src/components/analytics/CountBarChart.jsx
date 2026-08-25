import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function CountBarChart({ data, dataKey = 'count', nameKey = 'label', horizontal = false, height = 260, color = 'hsl(var(--primary))' }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        {horizontal ? (
          <>
            <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
            <YAxis type="category" dataKey={nameKey} tick={{ fontSize: 11 }} width={130} />
          </>
        ) : (
          <>
            <XAxis dataKey={nameKey} tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} width={30} />
          </>
        )}
        <Tooltip />
        <Bar dataKey={dataKey} name="Leads" fill={color} radius={[4, 4, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
  );
}