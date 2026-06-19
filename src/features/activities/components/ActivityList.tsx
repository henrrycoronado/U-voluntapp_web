import React from 'react';
import { ActivityCard } from './ActivityCard';
import { useActivitiesByProgram } from '../hooks/useActivityHooks';
import { Skeleton } from '../../../core/components/atoms/Skeleton';

interface ActivityListProps {
  programCode?: string;
}

export const ActivityList: React.FC<ActivityListProps> = ({ programCode }) => {
  const { data: activities, isLoading, error } = useActivitiesByProgram(programCode || '');

  if (!programCode) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-2xl text-zinc-400">
        <p>Seleccione un programa para ver sus actividades.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 w-full rounded-2xl" />)}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 p-4 bg-red-500/10 rounded-xl">Error al cargar actividades</div>;
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-2xl text-zinc-400">
        <p>No hay actividades disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <ActivityCard key={activity.uvaCode} activity={activity} />
      ))}
    </div>
  );
};
