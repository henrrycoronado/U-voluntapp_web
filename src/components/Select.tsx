import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string | number; label: string }[];
}

export const Select = ({ label, options, className = '', ...props }: SelectProps) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-xs text-zinc-400">{label}</label>}
      <select
        className="bg-zinc-900/50 border border-zinc-800 rounded-md p-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors appearance-none"
        {...props}
      >
        <option value="" disabled className="bg-[#18181b]">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#18181b]">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
