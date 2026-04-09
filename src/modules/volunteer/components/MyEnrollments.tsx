import { useState } from 'react';
import { useMyEnrollments } from '../service';
import { volunteerApi } from '../service';

export const MyEnrollments = () => {
  const { data: enrollments, loading, error } = useMyEnrollments();
  const [cancelingId, setCancelingId] = useState<number | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const handleCancel = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta inscripción?')) {
      return;
    }

    setCancelingId(id);
    setCancelError(null);

    try {
      await volunteerApi.cancelMyEnrollment(id);
      // Success - optionally refresh enrollments or show success message
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : 'Error al cancelar inscripción');
    } finally {
      setCancelingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400">Cargando tus inscripciones...</div>
    );
  }

  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Historial de Voluntariados
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md border border-red-300 dark:border-red-800">
          {error}
        </div>
      )}

      {cancelError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md border border-red-300 dark:border-red-800">
          {cancelError}
        </div>
      )}

      {safeEnrollments.length === 0 && !error ? (
        <p className="text-gray-500 dark:text-gray-400 py-4 text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 transition-colors">
          Aún no te has inscrito a ninguna actividad.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
              {safeEnrollments.map((enrollment) => (
                <tr
                  key={enrollment.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                    {enrollment.activityName || 'Actividad sin nombre'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {enrollment.createdAt
                      ? new Date(enrollment.createdAt).toLocaleDateString()
                      : 'Sin fecha'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        enrollment.state === 'Registered'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : enrollment.state === 'Cancelled'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {enrollment.state || 'Desconocido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {enrollment.state !== 'Cancelled' && (
                      <button
                        onClick={() => handleCancel(enrollment.id)}
                        disabled={cancelingId === enrollment.id}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-semibold transition-colors disabled:opacity-50"
                      >
                        {cancelingId === enrollment.id ? 'Cancelando...' : 'Cancelar'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
