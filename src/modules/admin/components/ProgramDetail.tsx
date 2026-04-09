import { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Card, Button, Alert } from '../../../components';
import { activitiesApi } from '../../../service/api';
import type { Activity, Program } from '../service/types/index';
import { CreateActivityModal } from './CreateActivityModal';

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
}

export function ProgramDetail({ program, onBack }: ProgramDetailProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program.id]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const response = await activitiesApi.getByProgram(program.id);
      setActivities((response.data as unknown as Activity[]) || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar actividades');
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityCreated = () => {
    loadActivities();
    setShowCreateModal(false);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Volver
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{program.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{program.description}</p>
            <p className="text-xs text-gray-400 mt-1">Estado: {program.state}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actividades</h3>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} /> Nueva Actividad
          </Button>
        </div>

        {error && <Alert type="error" message={error} />}

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Cargando actividades...</p>
        ) : activities.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Aun no hay actividades. Crea una para empezar.
          </p>
        ) : (
          <div className="grid gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{activity.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
                    {activity.state}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>📅 {new Date(activity.startDate).toLocaleDateString()}</span>
                  <span>📍 {activity.capacity} cupos</span>
                  <span>✅ {activity.enrolled || 0} inscritos</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <CreateActivityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        programId={program.id}
        onActivityCreated={handleActivityCreated}
      />
    </>
  );
}
