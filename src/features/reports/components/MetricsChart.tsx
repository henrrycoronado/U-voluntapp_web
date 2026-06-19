import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MetricsChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  title: string;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ data, xKey, yKey, title }) => {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#a1a1aa"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: '#3f3f46', opacity: 0.2 }}
              contentStyle={{
                backgroundColor: '#18181b',
                borderColor: '#3f3f46',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey={yKey} fill="#EAB308" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
