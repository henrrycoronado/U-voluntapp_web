import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, Button, Alert } from '../../../components';
import { adminApi } from '../service';
import type { Program } from '../service/types/index';

interface ProgramsListProps {
  onSelectProgram?: (program: Program) => void;
}

export function ProgramsList({ onSelectProgram }: ProgramsListProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllPrograms();
      setPrograms((response.data as unknown as Program[]) || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar programas');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Card className="p-6 text-center">Cargando programas...</Card>;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Explorar Programas</h3>
        <Button variant="primary" size="sm" className="flex items-center gap-2">
          <Plus size={16} /> Nuevo Programa
        </Button>
      </div>

      {error && <Alert type="error" message={error} />}

      {programs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No hay programas disponibles</p>
      ) : (
        <div className="grid gap-4">
          {programs.map((program) => (
            <div
              key={program.id}
              onClick={() => onSelectProgram?.(program)}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {program.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {program.description}
                  </p>
                  <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>Estado: {program.state}</span>
                    <span>ID: {program.id}</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded ml-4">
                  Ver detalles
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
