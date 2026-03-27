import type { ReactNode } from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: 'red' | 'blue' | 'green' | 'yellow';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function AnalyticsCard({ title, value, icon, color, trend }: AnalyticsCardProps) {
  const colorClasses = {
    red: 'bg-brand-red/10 dark:bg-brand-red/20 text-brand-red',
    blue: 'bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue',
    green: 'bg-brand-green/10 dark:bg-brand-green/20 text-brand-green',
    yellow: 'bg-brand-yellow/10 dark:bg-brand-yellow/20 text-brand-yellow',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${trend.isPositive ? 'text-brand-green' : 'text-brand-red'}`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={`${colorClasses[color]} p-4 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
}
