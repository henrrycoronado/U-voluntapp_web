import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../core/components/atoms/Input';
import { Button } from '../../../core/components/atoms/Button';
import { useCreateActivitySimple, useCreateActivity } from '../hooks/useActivityHooks';
import { useTypesByGroup } from '../../referenceCatalog/hooks/useReferenceCatalogHooks';
import { useToastStore } from '../../../core/store/toastStore';
import { LocationPickerMap } from '../../../core/components/maps/LocationPickerMap';
import type { ActivityDto } from '../types';

const activitySchema = z.object({
  programCode: z.string().optional(),
  activityTypeCode: z.string().min(1, 'Seleccione un tipo de actividad'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  date: z.string().min(1, 'Fecha requerida'),
  startTime: z.string().min(1, 'Hora de inicio requerida'),
  endTime: z.string().min(1, 'Hora de fin requerida'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  capacity: z.number().optional(),
  registrationRadiusMeters: z.number().optional(),
  requiresEnrollment: z.boolean(),
  requiresApproval: z.boolean(),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

interface ActivityFormProps {
  onSuccess?: () => void;
  activityToEdit?: ActivityDto;
  preSelectedProgram?: string;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ onSuccess, preSelectedProgram }) => {
  const { data: activityTypes = [], isLoading: isLoadingTypes } = useTypesByGroup('activity');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      programCode: preSelectedProgram || '',
      activityTypeCode: '',
      latitude: -16.5231,
      longitude: -68.1123,
      registrationRadiusMeters: 150,
      capacity: 50,
      requiresEnrollment: true,
      requiresApproval: false,
    },
  });

  const selectedType = watch('activityTypeCode');
  const isCustom = selectedType === 'type-6'; // Customize type code

  const radius = watch('registrationRadiusMeters');
  const { mutate: createSimple, isPending: isPendingSimple } = useCreateActivitySimple();
  const { mutate: createFull, isPending: isPendingFull } = useCreateActivity();
  const isPending = isPendingSimple || isPendingFull;
  const { addToast } = useToastStore();

  const handleLocationSelect = (lat: number, lng: number) => {
    setValue('latitude', lat);
    setValue('longitude', lng);
  };

  const onSubmit = (data: ActivityFormValues) => {
    const startDate = new Date(data.date + 'T' + data.startTime).toISOString();
    const endDate = new Date(data.date + 'T' + data.endTime).toISOString();

    if (isCustom) {
      createFull(
        {
          programCode: data.programCode,
          activityTypeCode: data.activityTypeCode,
          name: data.name,
          description: data.description,
          startDate,
          endDate,
          locationLatitude: data.latitude,
          locationLongitude: data.longitude,
          requiresEnrollment: data.requiresEnrollment,
          rule: {
            registrationRadiusMeters: data.registrationRadiusMeters || 150,
            requiresApproval: data.requiresApproval,
            totalCapacity: data.capacity,
          },
        },
        {
          onSuccess: () => {
            addToast('success', 'Actividad personalizada programada exitosamente');
            if (onSuccess) onSuccess();
          },
        }
      );
    } else {
      createSimple(
        {
          programCode: data.programCode,
          activityTypeCode: data.activityTypeCode,
          name: data.name,
          description: data.description,
          startDate,
          endDate,
          locationLatitude: data.latitude,
          locationLongitude: data.longitude,
          requiresEnrollment: false,
          requiresApproval: false,
        },
        {
          onSuccess: () => {
            addToast('success', 'Actividad programada exitosamente');
            if (onSuccess) onSuccess();
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        {!preSelectedProgram && (
          <Input
            label="Programa (Código)"
            {...register('programCode')}
            error={errors.programCode?.message}
          />
        )}
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-300">Tipo de Actividad</label>
          <select
            {...register('activityTypeCode')}
            className={`flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${errors.activityTypeCode ? 'border-red-500/50' : ''}`}
            disabled={isLoadingTypes}
          >
            <option value="" className="bg-zinc-900">
              Seleccione un tipo
            </option>
            {activityTypes.map((type) => (
              <option key={type.uvaCode} value={type.uvaCode} className="bg-zinc-900">
                {type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          {errors.activityTypeCode && (
            <p className="text-xs text-red-500">{errors.activityTypeCode.message}</p>
          )}
        </div>
      </div>
      <Input label="Nombre de Actividad" {...register('name')} error={errors.name?.message} />
      <Input label="Descripción" {...register('description')} error={errors.description?.message} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input type="date" label="Fecha" {...register('date')} error={errors.date?.message} />
        <Input
          type="time"
          label="Hora Inicio"
          {...register('startTime')}
          error={errors.startTime?.message}
        />
        <Input
          type="time"
          label="Hora Fin"
          {...register('endTime')}
          error={errors.endTime?.message}
        />
      </div>

      {isCustom && (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-xl">
            <Input
              type="number"
              label="Capacidad Max."
              {...register('capacity', { valueAsNumber: true })}
              error={errors.capacity?.message}
            />
            <Input
              type="number"
              label="Radio Geocerca (m)"
              {...register('registrationRadiusMeters', { valueAsNumber: true })}
              error={errors.registrationRadiusMeters?.message}
            />
          </div>

          <div className="flex gap-4 text-sm text-zinc-300 p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-xl">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('requiresEnrollment')}
                className="accent-yellow-500 w-4 h-4"
              />
              Requiere inscripción
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('requiresApproval')}
                className="accent-yellow-500 w-4 h-4"
              />
              Requiere aprobación
            </label>
          </div>
        </>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          Ubicación (Haz clic en el mapa)
        </label>
        <LocationPickerMap
          onLocationSelect={handleLocationSelect}
          radius={isCustom ? radius : 150}
        />
        {(errors.latitude || errors.longitude) && (
          <p className="text-xs text-red-500">Debe seleccionar una ubicación en el mapa.</p>
        )}
      </div>

      <div className="pt-4 flex justify-end sticky bottom-0 bg-zinc-900 pb-2">
        <Button type="submit" variant="primary" isLoading={isPending}>
          Programar Actividad
        </Button>
      </div>
    </form>
  );
};
