import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ActivityList } from '../../activities/components/ActivityList';
import { useProgramByCode } from '../hooks/useProgramHooks';
import { Button } from '../../../core/components/atoms/Button';
import { ArrowLeft } from 'lucide-react';

export const ProgramActivitiesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: program } = useProgramByCode(id || '');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            variant="ghost"
            className="mb-2 -ml-4"
            onClick={() => navigate(`/programs/${id}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Programa
          </Button>
          <h2 className="text-3xl font-bold tracking-tight text-white">Actividades</h2>
          <p className="text-zinc-400">
            Mostrando actividades de:{' '}
            <span className="font-semibold text-yellow-500">{program?.name || 'Cargando...'}</span>
          </p>
        </div>
      </div>

      <ActivityList programCode={id} />
    </div>
  );
};

export default ProgramActivitiesPage;
