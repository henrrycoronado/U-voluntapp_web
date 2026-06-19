import React, { useState } from 'react';
import { Input } from '../../../core/components/atoms/Input';
import { Button } from '../../../core/components/atoms/Button';

export const SecurityForm: React.FC = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Este formulario está desactivado intencionalmente
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mb-4">
        <p className="text-yellow-400 font-medium text-sm">
          💡 La funcionalidad de cambio de contraseña está en construcción. Estará disponible en futuras actualizaciones.
        </p>
      </div>

      <Input 
        label="Contraseña Actual" 
        type="password"
        value={form.currentPassword} 
        onChange={e => setForm({...form, currentPassword: e.target.value})} 
        disabled
      />
      <Input 
        label="Nueva Contraseña" 
        type="password"
        value={form.newPassword} 
        onChange={e => setForm({...form, newPassword: e.target.value})} 
        disabled
      />
      <Input 
        label="Confirmar Nueva Contraseña" 
        type="password"
        value={form.confirmPassword} 
        onChange={e => setForm({...form, confirmPassword: e.target.value})} 
        disabled
      />

      <Button 
        type="button" 
        className="w-full mt-4 opacity-50 cursor-not-allowed" 
        disabled
      >
        Cambiar Contraseña
      </Button>
    </form>
  );
};
