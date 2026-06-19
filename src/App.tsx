import React from 'react';
import AppRouter from './core/routes/AppRouter';
import { useThemeStore } from './core/store/themeStore';
import { ToastContainer } from './core/components/atoms/ToastContainer';

const App: React.FC = () => {
  useThemeStore();

  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
             <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="mt-4 text-yellow-500 font-medium tracking-widest">CARGANDO...</p>
          </div>
        </div>
      }
    >
      <AppRouter />
      <ToastContainer />
    </React.Suspense>
  );
};

export default App;
