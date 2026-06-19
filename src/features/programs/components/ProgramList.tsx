import React from 'react';
import { ProgramCard } from './ProgramCard';
import { usePrograms } from '../hooks/useProgramHooks';
import { Skeleton } from '../../../core/components/atoms/Skeleton';

export const ProgramList: React.FC = () => {
  const { data: programs, isLoading, error } = usePrograms();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 p-4 bg-red-500/10 rounded-xl">Error al cargar programas</div>;
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-2xl text-zinc-400">
        <p>No hay programas disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program.uvaCode} program={program} />
      ))}
    </div>
  );
};
