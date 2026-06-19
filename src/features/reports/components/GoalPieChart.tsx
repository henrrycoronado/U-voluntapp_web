import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface GoalPieChartProps {
  validatedHours: number;
  goalHours: number;
  title: string;
}

export const GoalPieChart: React.FC<GoalPieChartProps> = ({ validatedHours, goalHours, title }) => {
  const remainingHours = Math.max(0, goalHours - validatedHours);
  
  const data = [
    { name: 'Horas Completadas', value: validatedHours, color: '#EAB308' }, // yellow-500
    { name: 'Horas Faltantes', value: remainingHours, color: '#3f3f46' }, // zinc-700
  ];

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center">
      <h3 className="text-lg font-semibold text-white mb-2 self-start">{title}</h3>
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', color: '#fff' }} 
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#a1a1aa', fontSize: '12px' }}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center mt-[-10px]">
            <span className="text-2xl font-bold text-white">
              {goalHours > 0 ? Math.round((validatedHours / goalHours) * 100) : 100}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
