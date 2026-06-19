import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../core/components/atoms/Button';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-black text-zinc-100">
      <h1 className="text-9xl font-extrabold text-red-950">403</h1>
      <h2 className="text-2xl font-bold mt-4">Acceso Denegado</h2>
      <p className="text-zinc-400 mt-2 max-w-md">
        No tienes los permisos necesarios para acceder a esta sección. Contacta a un coordinador si
        crees que esto es un error.
      </p>
      <Link to="/dashboard" className="mt-8">
        <Button variant="outline">Volver a tu Dashboard</Button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
