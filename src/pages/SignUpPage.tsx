import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../core/components/atoms/Button';
import { Input } from '../core/components/atoms/Input';
import { Card } from '../core/components/atoms/Card';
import { useAuth } from '../features/auth/hooks/useAuth';
import { isInstitutionalEmail } from '../core/utils/validations';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuth();

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setErrorMsg('Todos los campos son requeridos.');
      return;
    }

    if (!isInstitutionalEmail(form.email)) {
      setErrorMsg('Debe ser un correo institucional (ej. .edu.bo).');
      return;
    }

    try {
      await signup(form);
      navigate('/login');
    } catch (error: unknown) {
      const err = error as Error;
      setErrorMsg(err.message || 'Error al registrar la cuenta');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-yellow-500">Crear Cuenta</h1>
          <p className="text-sm text-zinc-400 mt-2">
            Regístrate como voluntario usando tu correo institucional
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 text-red-400 text-sm rounded-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Juan"
            />
            <Input
              label="Apellido"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Pérez"
            />
          </div>
          <Input
            label="Correo Institucional"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="usuario@ucb.edu.bo"
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <Button type="submit" className="w-full mt-2" isLoading={isSigningUp}>
            Registrarme
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
