import React, { useState } from 'react';
import { useLogin } from '../hooks';
import { Button } from '../../../core/components/atoms/Button';
import { Input } from '../../../core/components/atoms/Input';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../core/store/authStore';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) return setErrorMsg('Llena todos los campos');
    try {
      const res = await loginMutation.mutateAsync({ email, password });
      setAuth({
        id: res.uvaCode,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        token: res.token,
        refreshToken: res.refreshToken,
        roles: res.roles as any,
      });
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {errorMsg && <div className="p-3 bg-red-950/50 border border-red-500/50 text-red-400 rounded-lg text-sm">{errorMsg}</div>}
      <Input label="Correo Institucional" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="usuario@ucb.edu.bo" />
      <Input label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
      <Button type="submit" className="w-full mt-4" isLoading={loginMutation.isPending}>Entrar al Sistema</Button>
    </form>
  );
};