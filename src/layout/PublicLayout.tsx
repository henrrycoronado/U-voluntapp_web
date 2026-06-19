import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-yellow-500 tracking-tight">
            U-VoluntApp
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} U-VoluntApp. Desarrollado para la Universidad Católica
          Boliviana.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
