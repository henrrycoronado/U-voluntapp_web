import React from 'react';
import AppRouter from './core/routes/AppRouter';
import { useThemeStore } from './core/store/themeStore';

const App: React.FC = () => {
  useThemeStore();

  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-yellow-500">
          Cargando...
        </div>
      }
    >
      <AppRouter />
    </React.Suspense>
  );
};

export default App;
