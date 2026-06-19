import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../core/components/atoms/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-black text-zinc-100">
      <h1 className="text-9xl font-extrabold text-zinc-800">404</h1>
      <h2 className="text-2xl font-bold mt-4">Página no encontrada</h2>
      <p className="text-zinc-400 mt-2 max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" className="mt-8">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
