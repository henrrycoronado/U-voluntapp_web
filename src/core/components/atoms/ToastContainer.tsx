import React from 'react';
import { useToastStore } from '../../store/toastStore';

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg backdrop-blur-md border text-sm font-medium animate-in slide-in-from-right-4 fade-in duration-300 ${
            t.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-200' :
            t.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-200' :
            t.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-200' :
            'bg-blue-500/10 border-blue-500/50 text-blue-200'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};
