import React, { useState, useEffect } from 'react';
import { useMe, useUpdateMe } from '../hooks/useProfileHooks';
import { Input } from '../../../core/components/atoms/Input';
import { Button } from '../../../core/components/atoms/Button';
import { useTypesByGroup } from '../../referenceCatalog/hooks/useReferenceCatalogHooks';

export const PersonalInfoForm: React.FC = () => {
  const { data: profile } = useMe();
  const updateMutation = useUpdateMe();
  const { data: careers, isLoading: careersLoading } = useTypesByGroup('career');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    careerCode: '',
    personalGoalHours: 0,
  });

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        careerCode: profile.careerCode || '',
        personalGoalHours: profile.personalGoalHours || 0,
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Celular / Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          label="Meta de Horas (Personal)"
          type="number"
          value={form.personalGoalHours}
          onChange={(e) => setForm({ ...form, personalGoalHours: Number(e.target.value) })}
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Carrera</label>
        <select
          className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          value={form.careerCode}
          onChange={(e) => setForm({ ...form, careerCode: e.target.value })}
          disabled={careersLoading}
        >
          <option value="">-- Selecciona tu Carrera --</option>
          {careers?.map((c) => (
            <option key={c.uvaCode} value={c.uvaCode}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" className="w-full mt-4" isLoading={updateMutation.isPending}>
        Guardar Cambios
      </Button>
    </form>
  );
};
