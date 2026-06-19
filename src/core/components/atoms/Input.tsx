import React, { type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const finalId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={finalId} className="text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}
        <input
          id={finalId}
          ref={ref}
          className={`flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500/50 focus-visible:ring-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
