import React from 'react';
import { Card } from './Card';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export const AnalyticsCard = ({ title, value, icon, trend, trendUp }: AnalyticsCardProps) => {
  return (
    <Card className="p-6 flex flex-col gap-4 bg-[#121214] hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-400">{title}</span>
        <div className="text-yellow-500 bg-yellow-500/10 p-2.5 rounded-lg border border-yellow-500/20">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between mt-2">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-md ${trendUp ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
    </Card>
  );
};
