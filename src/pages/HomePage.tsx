import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../core/components/atoms/Button';

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto space-y-8">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        Gestiona el voluntariado con <span className="text-yellow-500">precisión</span>.
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
        Plataforma de la Pastoral Universitaria Juveil para coordinar, registrar y trazar la
        participación y asistencia de voluntarios.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
        <Link to="/login" className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            Iniciar Sesión
          </Button>
        </Link>
        <Link to="/signup" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full">
            Crear Cuenta Institucional
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
