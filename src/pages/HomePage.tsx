import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../core/components/atoms/Button';
import BannerImage from '../core/assets/Banner.svg';

export const HomePage: React.FC = () => {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Banner with blur */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <img
          src={BannerImage}
          alt="Background Banner"
          className="w-full h-full object-cover filter blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
          Gestiona el voluntariado con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            precisión
          </span>
          .
        </h1>
        <p className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto drop-shadow-md">
          Plataforma de la Pastoral Universitaria Juvenil para coordinar, registrar y trazar la
          participación y asistencia de voluntarios.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 w-full pt-8">
          <Link to="/login" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-lg px-8 py-6 shadow-xl shadow-yellow-500/20">
              Iniciar Sesión
            </Button>
          </Link>
          <Link to="/signup" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full text-lg px-8 py-6 border-zinc-700 hover:bg-white/10 backdrop-blur-md"
            >
              Crear Cuenta Institucional
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
