import React, { useState } from 'react';
import { useRegister } from '../hooks';
import { Button } from '../../../core/components/atoms/Button';
import { Input } from '../../../core/components/atoms/Input';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../core/store/authStore';
import { useTypesByGroup } from '../../referenceCatalog/hooks/useReferenceCatalogHooks';

export const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    careerCode: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { data: careers, isLoading: careersLoading } = useTypesByGroup('career');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await registerMutation.mutateAsync(form);
      setAuth({
        id: res.uvaCode,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        token: res.token,
        refreshToken: res.refreshToken,
        roles: res.roles as string[],
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {errorMsg && (
        <div className="p-3 bg-red-950/50 border border-red-500/50 text-red-400 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nombre"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <Input
          label="Apellido"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Carrera</label>
        <select
          className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          value={form.careerCode}
          onChange={(e) => setForm({ ...form, careerCode: e.target.value })}
          disabled={careersLoading}
          required
        >
          <option value="">-- Selecciona tu Carrera --</option>
          {careers?.map((c) => (
            <option key={c.uvaCode} value={c.uvaCode}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Correo Institucional"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="usuario@ucb.edu.bo"
      />
      <Input
        label="Contraseña"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Mínimo 8 caracteres"
      />
      <Button type="submit" className="w-full mt-4" isLoading={registerMutation.isPending}>
        Registrarme
      </Button>
    </form>
  );
};
