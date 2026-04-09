import { useState } from 'react';
import { AxiosError } from 'axios';
import { Modal, Button, Alert } from '../../../components';
import { activitiesApi } from '../../../service/api';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: number;
  onActivityCreated?: () => void;
}

export function CreateActivityModal({
  isOpen,
  onClose,
  programId,
  onActivityCreated,
}: CreateActivityModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('El nombre de la actividad es requerido');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setError('Las fechas de inicio y fin son requeridas');
      return;
    }

    try {
      setLoading(true);

      // Convert datetime-local format to ISO 8601
      const startDate = new Date(formData.startDate).toISOString();
      const endDate = new Date(formData.endDate).toISOString();

      console.log('Sending payload:', {
        ProgramId: programId,
        ActivityTypeId: 1,
        Name: formData.name.trim(),
        StartDate: startDate,
        EndDate: endDate,
        RequiresEnrollment: true,
        RequiresApproval: false,
      });

      const payload = {
        ProgramId: programId,
        ActivityTypeId: 1,
        Name: formData.name.trim(),
        StartDate: startDate,
        EndDate: endDate,
        RequiresEnrollment: true,
        RequiresApproval: false,
      };
      await activitiesApi.createSimple(payload);

      setFormData({ name: '', startDate: '', endDate: '' });
      onActivityCreated?.();
    } catch (error: unknown) {
      console.error('Error creating activity:', error);
      let errorMessage = 'Error al crear la actividad';
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" title="Crear Nueva Actividad">
      {error && <Alert type="error" message={error} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre de la Actividad
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Limpieza del parque"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de Inicio
            </label>
            <input
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de Fin
            </label>
            <input
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Actividad'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
