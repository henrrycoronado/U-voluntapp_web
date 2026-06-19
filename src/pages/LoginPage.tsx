import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../core/components/atoms/Button';
import { Input } from '../core/components/atoms/Input';
import { Card } from '../core/components/atoms/Card';
import { useAuth } from '../core/networks/hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Por favor llena todos los campos.');
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (error: unknown) {
      const err = error as Error;
      setErrorMsg(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-500">Bienvenido de nuevo</h1>
          <p className="text-sm text-zinc-400 mt-2">Ingresa tus credenciales para acceder</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 text-red-400 text-sm rounded-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Correo Institucional"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@ucb.edu.bo"
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Button type="submit" className="w-full" isLoading={isLoggingIn}>
            Entrar al Sistema
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          ¿No tienes una cuenta?{' '}
          <Link to="/signup" className="text-yellow-500 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
