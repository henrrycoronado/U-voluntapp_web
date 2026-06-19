import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../core/components/atoms/Button';
import { useToastStore } from '../../../core/store/toastStore';
import { useAuthStore } from '../../../core/store/authStore';
import { roleService } from '../services/roleService';
import type { CreateRoleRequestDto } from '../types';

interface RoleRequestFormProps {
  targetRole: 'coordinator' | 'admin';
}

export const RoleRequestForm: React.FC<RoleRequestFormProps> = ({ targetRole }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateRoleRequestDto>();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();

  const onSubmit = async (data: CreateRoleRequestDto) => {
    try {
      if (user?.email) {
        data.email = user.email;
      }
      if (targetRole === 'coordinator') {
        await roleService.requestCoordinator(data);
      } else {
        await roleService.requestAdmin(data);
      }
      addToast('success', 'Solicitud enviada exitosamente');
      reset();
    } catch {
      addToast('error', 'Error al enviar la solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Justificación</label>
        <textarea
          {...register('reason', { required: true })}
          className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
          rows={4}
          placeholder="Explica brevemente por qué solicitas este rol..."
        />
      </div>
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Enviar Solicitud
      </Button>
    </form>
  );
};
