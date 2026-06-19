import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../core/components/atoms/Card';
import { LoginForm } from '../features/auth/components';

export const LoginPage: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Card className="w-full max-w-md relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
            Bienvenido de nuevo
          </h1>
          <p className="text-sm text-zinc-400 mt-2">Ingresa tus credenciales institucionales</p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center text-sm text-zinc-500">
          ¿No tienes una cuenta?{' '}
          <Link to="/signup" className="text-yellow-400 hover:text-yellow-300 font-medium hover:underline transition-colors">
            Regístrate aquí
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
