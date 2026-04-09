import { useState } from 'react';
import { useAvailablePrograms, useActivitiesByProgram } from '../service';
import { volunteerApi } from '../service';
import type { Program } from '../service';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export const ProgramExplorer = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const { data: programs, loading, error } = useAvailablePrograms();
  const { data: activities, loading: activitiesLoading } = useActivitiesByProgram(
    selectedProgram?.id ?? null
  );

  const handleSelectProgram = (program: Program | null) => {
    setSelectedProgram(program);
    setEnrollError(null);
  };

  const handleEnroll = async (activityId: number) => {
    if (!selectedProgram) return;
    setEnrollingId(activityId);
    setEnrollError(null);

    try {
      await volunteerApi.enrollInActivity({ activityId });
      setEnrollError(null);
      // Optionally refresh enrollments or show success message
    } catch (err) {
      setEnrollError(getErrorMessage(err));
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading)
    return <div className="p-4 text-gray-500 dark:text-gray-400">Cargando programas...</div>;

  return (
    <div className="space-y-6 transition-colors">
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md border border-red-300 dark:border-red-800">
          {error}
        </div>
      )}

      {enrollError && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md border border-red-300 dark:border-red-800">
          {enrollError}
        </div>
      )}

      {!selectedProgram ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Programas Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!programs || programs.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No hay programas activos en este momento.
              </p>
            ) : (
              programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleSelectProgram(program)}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {program.description}
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    Ver actividades →
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleSelectProgram(null)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-4 font-medium transition-colors"
          >
            ← Volver a programas
          </button>

          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            {selectedProgram.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProgram.description}</p>

          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Actividades (Rutas)
          </h3>

          {activitiesLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Buscando actividades...</p>
          ) : !activities || activities.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
              Aún no hay actividades planificadas para este programa.
            </p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="mb-4 sm:mb-0">
                    <h4 className="font-bold text-gray-900 dark:text-white">{activity.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                      <span>⏱️ {activity.totalHours} hrs</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEnroll(activity.id)}
                    disabled={enrollingId === activity.id}
                    className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
                  >
                    {enrollingId === activity.id ? 'Procesando...' : 'Inscribirme'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
