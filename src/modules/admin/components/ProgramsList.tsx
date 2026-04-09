import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, Button, Alert } from '../../../components';
import { adminApi } from '../api/adminApi';
import type { Program } from '../types';
import type { AxiosResponse } from 'axios';

interface ProgramsListProps {
  onEditProgram?: (program: Program) => void;
  onCreateActivity?: (programId: number) => void;
}

export function ProgramsList({ onEditProgram, onCreateActivity }: ProgramsListProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const response = (await adminApi.getAllPrograms()) as AxiosResponse<{ data: Program[] }>;
      setPrograms(response.data?.data || []);
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Programas</h3>
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
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{program.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{program.description}</p>
                <p className="text-xs text-gray-400 mt-1">Estado: {program.state}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onCreateActivity?.(program.id)}
                  className="flex items-center gap-1"
                >
                  <Plus size={14} /> Actividad
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEditProgram?.(program)}
                  className="flex items-center gap-1"
                >
                  <Edit2 size={14} />
                </Button>
                <Button variant="danger" size="sm" className="flex items-center gap-1">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
