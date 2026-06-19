import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../core/components/atoms/Input';
import { Button } from '../../../core/components/atoms/Button';
import { useCreateProgram } from '../hooks/useProgramHooks';
import { useToastStore } from '../../../core/store/toastStore';

const programSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  acronym: z.string().optional(),
});

type ProgramFormValues = z.infer<typeof programSchema>;

import type { ProgramDto } from '../types';

interface ProgramFormProps {
  onSuccess?: () => void;
  programToEdit?: ProgramDto;
}

export const ProgramForm: React.FC<ProgramFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
  });

  const { mutate, isPending } = useCreateProgram();
  const { addToast } = useToastStore();

  const onSubmit = (data: ProgramFormValues) => {
    mutate(
      {
        name: data.name,
        acronym: data.acronym || undefined,
      },
      {
        onSuccess: () => {
          addToast('success', 'Programa creado exitosamente');
          if (onSuccess) onSuccess();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Nombre del Programa" {...register('name')} error={errors.name?.message} />
      <Input
        label="Acrónimo (opcional)"
        {...register('acronym')}
        error={errors.acronym?.message}
        placeholder="Ej. VOL, PASB"
      />
      <div className="pt-4 flex justify-end">
        <Button type="submit" variant="primary" isLoading={isPending}>
          Crear Programa
        </Button>
      </div>
    </form>
  );
};
