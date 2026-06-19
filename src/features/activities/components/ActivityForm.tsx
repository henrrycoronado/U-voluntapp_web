import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../core/components/atoms/Input';
import { Button } from '../../../core/components/atoms/Button';
import { useCreateActivitySimple } from '../hooks/useActivityHooks';
import { useToastStore } from '../../../core/store/toastStore';
import { LocationPickerMap } from '../../../core/components/maps/LocationPickerMap';

const activitySchema = z.object({
  programCode: z.string().min(1, 'Código de programa requerido'),
  activityTypeCode: z.string().min(1, 'Tipo de actividad requerido'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  date: z.string().min(1, 'Fecha requerida'),
  startTime: z.string().min(1, 'Hora de inicio requerida'),
  endTime: z.string().min(1, 'Hora de fin requerida'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  capacity: z.number().min(1, 'Capacidad debe ser mayor a 0'),
  registrationRadiusMeters: z.number().min(10, 'El radio debe ser de al menos 10 metros'),
  requiresEnrollment: z.boolean(),
  requiresApproval: z.boolean(),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

interface ActivityFormProps {
  onSuccess?: () => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activityTypeCode: 'GEN',
      latitude: -16.5231,
      longitude: -68.1123,
      registrationRadiusMeters: 150,
      capacity: 50,
      requiresEnrollment: true,
      requiresApproval: false,
    }
  });

  const radius = watch('registrationRadiusMeters');
  const { mutate, isPending } = useCreateActivitySimple();
  const { addToast } = useToastStore();

  const handleLocationSelect = (lat: number, lng: number) => {
    setValue('latitude', lat);
    setValue('longitude', lng);
  };

  const onSubmit = (data: ActivityFormValues) => {
    mutate({
      programCode: data.programCode,
      activityTypeCode: data.activityTypeCode,
      name: data.name,
      description: data.description,
      startDate: new Date(data.date + 'T' + data.startTime).toISOString(),
      endDate: new Date(data.date + 'T' + data.endTime).toISOString(),
      locationLatitude: data.latitude,
      locationLongitude: data.longitude,
      requiresEnrollment: data.requiresEnrollment,
      requiresApproval: data.requiresApproval,
      capacity: data.capacity,
    }, {
      onSuccess: () => {
        addToast('success', 'Actividad programada exitosamente');
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Programa (Código)" {...register('programCode')} error={errors.programCode?.message} />
        <Input label="Tipo Actividad (Ej. GEN)" {...register('activityTypeCode')} error={errors.activityTypeCode?.message} />
      </div>
      <Input label="Nombre de Actividad" {...register('name')} error={errors.name?.message} />
      <Input label="Descripción" {...register('description')} error={errors.description?.message} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input type="date" label="Fecha" {...register('date')} error={errors.date?.message} />
        <Input type="time" label="Hora Inicio" {...register('startTime')} error={errors.startTime?.message} />
        <Input type="time" label="Hora Fin" {...register('endTime')} error={errors.endTime?.message} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input type="number" label="Capacidad Max." {...register('capacity', { valueAsNumber: true })} error={errors.capacity?.message} />
        <Input type="number" label="Radio Geocerca (m)" {...register('registrationRadiusMeters', { valueAsNumber: true })} error={errors.registrationRadiusMeters?.message} />
      </div>

      <div className="flex gap-4 text-sm text-zinc-300">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('requiresEnrollment')} className="accent-yellow-500" />
          Requiere inscripción
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('requiresApproval')} className="accent-yellow-500" />
          Requiere aprobación
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">Ubicación (Haz clic en el mapa)</label>
        <LocationPickerMap
          onLocationSelect={handleLocationSelect}
          radius={radius}
        />
        {(errors.latitude || errors.longitude) && <p className="text-xs text-red-500">Debe seleccionar una ubicación en el mapa.</p>}
      </div>

      <div className="pt-4 flex justify-end sticky bottom-0 bg-zinc-900 pb-2">
        <Button type="submit" variant="primary" isLoading={isPending}>Programar Actividad</Button>
      </div>
    </form>
  );
};
