import React from 'react';
import { Card } from '../../../core/components/atoms/Card';
import { MetricsChart } from '../../reports/components/MetricsChart';
import { GoalPieChart } from '../../reports/components/GoalPieChart';
import { useAuthStore } from '../../../core/store/authStore';
import { useMyVolunteerReport } from '../../reports/hooks/useReportHooks';
import { useMyMonthlyTrackings } from '../../tracking/hooks/useTrackingHooks';
import { Skeleton } from '../../../core/components/atoms/Skeleton';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { data: report, isLoading: isReportLoading } = useMyVolunteerReport();
  const { data: trackings, isLoading: isTrackingsLoading } = useMyMonthlyTrackings();

  if (isReportLoading || isTrackingsLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-1/2 h-6" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
      </div>
    );
  }

  const completionPercentage = report && report.personalGoalHours > 0 
    ? (report.validatedHours / report.personalGoalHours) * 100 
    : 0;

  let motivationalMessage = "¡Aún tienes un largo camino por recorrer, sigue así!";
  if (completionPercentage >= 100) {
    motivationalMessage = "¡Felicidades! Has alcanzado tu meta personal de voluntariado. Eres un ejemplo a seguir.";
  } else if (completionPercentage >= 80) {
    motivationalMessage = "¡Casi lo logras! Estás a un paso de cumplir tu meta, ¡no te rindas ahora!";
  } else if (completionPercentage >= 50) {
    motivationalMessage = "¡Vas por buen camino! Has completado más de la mitad de tu meta. Sigue participando.";
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Hola, {user?.firstName}</h2>
        <p className="text-zinc-400">Resumen operativo de tu participación en U-VoluntApp.</p>
      </div>

      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
        <p className="text-yellow-400 font-medium">💡 {motivationalMessage}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-yellow-500/20">
          <h3 className="text-lg font-medium text-zinc-300">Horas Totales (Validadas)</h3>
          <p className="text-4xl font-black text-yellow-500 mt-2">{report?.validatedHours || 0}</p>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-transparent">
          <h3 className="text-lg font-medium text-zinc-300">Actividades Participadas</h3>
          <p className="text-4xl font-black text-white mt-2">{report?.totalActivitiesParticipated || 0}</p>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-transparent">
          <h3 className="text-lg font-medium text-zinc-300">Meta Personal</h3>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
            {report?.personalGoalHours || 0} hrs
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsChart data={trackings || []} xKey="name" yKey="horas" title="Horas Registradas (Últimos Meses)" />
        <GoalPieChart 
          validatedHours={report?.validatedHours || 0} 
          goalHours={report?.personalGoalHours || 0} 
          title="Progreso de Meta Personal"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
