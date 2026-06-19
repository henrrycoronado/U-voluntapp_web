import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../core/components/atoms/Button';
import { useToastStore } from '../../../core/store/toastStore';
import { useAuthStore } from '../../../core/store/authStore';
import { programService } from '../../programs/services/programService';
import { collaboratorService } from '../../collaborators/services/collaboratorService';
import type { ProgramDto } from '../../programs/types';
import type { AddProgramCollaboratorDto } from '../../collaborators/types';

export const ProgramJoinForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddProgramCollaboratorDto>();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const [programs, setPrograms] = useState<ProgramDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programService.getAll();
        // Assuming we only want to show active programs (e.g. stateCode stage-1/stage-2 whatever is active, for now show all or filter if needed)
        // Let's filter out 'stage-4' (which might be deleted/completed) or just show all for now.
        setPrograms(data.filter((p) => p.stateCode !== 'stage-4'));
      } catch {
        addToast('error', 'Error al cargar programas');
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [addToast]);

  const onSubmit = async (data: AddProgramCollaboratorDto) => {
    try {
      if (!user?.id) throw new Error('No user profile code');
      // Add the profile code to the request and set stateCode to "stage-1" (pending)
      data.profileCode = user.id;
      data.stateCode = 'stage-1';

      await collaboratorService.create(data);
      addToast('success', 'Solicitud para unirse al programa enviada');
      reset();
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 400) {
          addToast('error', 'Ya eres parte de este programa o ya tienes una solicitud pendiente');
          return;
        }
      }
      addToast('error', 'Error al solicitar unirse al programa');
    }
  };

  if (loading) return <div className="text-zinc-500 text-sm">Cargando programas...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Programa</label>
        <select
          {...register('programCode', { required: true })}
          className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
        >
          <option value="">Selecciona un programa</option>
          {programs.map((p) => (
            <option key={p.uvaCode} value={p.uvaCode}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
        disabled={programs.length === 0}
      >
        Enviar Solicitud
      </Button>
    </form>
  );
};
