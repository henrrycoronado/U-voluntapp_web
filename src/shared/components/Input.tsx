import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      )}
      <input
        {...props}
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
          error ? 'border-brand-red dark:border-brand-red' : 'border-gray-300 dark:border-gray-600'
        } ${className}`}
      />
      {error && <span className="text-brand-red dark:text-red-400 text-sm mt-1">{error}</span>}
    </div>
  );
}

export function TextArea({ label, error, className = '', ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      )}
      <textarea
        {...props}
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none ${
          error ? 'border-brand-red dark:border-brand-red' : 'border-gray-300 dark:border-gray-600'
        } ${className}`}
      />
      {error && <span className="text-brand-red dark:text-red-400 text-sm mt-1">{error}</span>}
    </div>
  );
}
