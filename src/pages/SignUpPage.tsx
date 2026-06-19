import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../core/components/atoms/Card';
import { RegisterForm } from '../features/auth/components';

export const SignUpPage: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Card className="w-full max-w-lg relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
            Crear Cuenta
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Regístrate como voluntario usando tu correo @ucb.edu.bo
          </p>
        </div>

        <RegisterForm />

        <div className="mt-8 text-center text-sm text-zinc-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-medium hover:underline transition-colors">
            Inicia sesión
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
