import React from 'react';
import { Card } from '../../../core/components/atoms/Card';
import { Button } from '../../../core/components/atoms/Button';
import { useProgramsReport, useActivitiesReport, useRefreshReports } from '../hooks/useReportHooks';
import { useToastStore } from '../../../core/store/toastStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BarChart3,
  PieChart as PieChartIcon,
  RefreshCw,
  Users,
  Clock,
  Activity,
} from 'lucide-react';
import type { ProgramAnalyticsDto, ActivityAnalyticsDto } from '../types/ReportDto';

const COLORS = ['#EAB308', '#3B82F6', '#10B981', '#F43F5E', '#8B5CF6', '#F97316'];

export const ReportsPage: React.FC = () => {
  const {
    data: programData = [],
    isLoading: isLoadingPrograms,
    refetch: refetchPrograms,
  } = useProgramsReport();
  const {
    data: activityData = [],
    isLoading: isLoadingActivities,
    refetch: refetchActivities,
  } = useActivitiesReport();
  const { mutate: refreshAnalytics, isPending: isRefreshing } = useRefreshReports();
  const { addToast } = useToastStore();

  const handleRefresh = () => {
    refreshAnalytics(undefined, {
      onSuccess: () => {
        addToast('success', 'Analíticos actualizados correctamente');
        refetchPrograms();
        refetchActivities();
      },
      onError: () => {
        addToast('error', 'Error al actualizar los analíticos');
      },
    });
  };

  const isLoading = isLoadingPrograms || isLoadingActivities;

  const typedProgramData = programData as ProgramAnalyticsDto[];
  const typedActivityData = activityData as ActivityAnalyticsDto[];

  const totalPrograms = typedProgramData.length;
  const totalVolunteers = typedProgramData.reduce(
    (acc, curr) => acc + curr.totalUniqueVolunteers,
    0
  );
  const totalHours = typedProgramData.reduce((acc, curr) => acc + curr.totalGeneratedHours, 0);
  const totalActivities = typedProgramData.reduce((acc, curr) => acc + curr.totalActivities, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-yellow-500">
        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
        <p>Cargando reportes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-yellow-500" />
            Reportes y Estadísticas
          </h1>
          <p className="text-zinc-400 mt-2">
            Visión general del desempeño de programas y actividades.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          isLoading={isRefreshing}
          variant="outline"
          className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Actualizar Datos
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Programas</p>
              <h3 className="text-3xl font-bold text-white mt-2">{totalPrograms}</h3>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <PieChartIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-zinc-400">Voluntarios Únicos</p>
              <h3 className="text-3xl font-bold text-white mt-2">{totalVolunteers}</h3>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-zinc-400">Horas Generadas</p>
              <h3 className="text-3xl font-bold text-white mt-2">{totalHours.toFixed(1)}</h3>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-zinc-400">Total Actividades</p>
              <h3 className="text-3xl font-bold text-white mt-2">{totalActivities}</h3>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Programs Chart - Generated Hours */}
        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">Horas Generadas por Programa</h3>
          {typedProgramData.length === 0 ? (
            <p className="text-zinc-500 text-center py-12">No hay datos disponibles</p>
          ) : (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={typedProgramData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                  <XAxis
                    dataKey="programName"
                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip
                    cursor={{ fill: '#ffffff0d' }}
                    contentStyle={{
                      backgroundColor: '#18181b',
                      borderColor: '#27272a',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar
                    dataKey="totalGeneratedHours"
                    name="Horas"
                    fill="#EAB308"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Programs Chart - Volunteers */}
        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">Voluntarios Únicos por Programa</h3>
          {typedProgramData.length === 0 ? (
            <p className="text-zinc-500 text-center py-12">No hay datos disponibles</p>
          ) : (
            <div className="h-80 w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typedProgramData}
                    dataKey="totalUniqueVolunteers"
                    nameKey="programName"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                    stroke="none"
                  >
                    {typedProgramData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      borderColor: '#27272a',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* Activities Data Table */}
      <Card className="p-6 bg-white/5 border-white/10 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6">Rendimiento de Actividades</h3>
        {typedActivityData.length === 0 ? (
          <p className="text-zinc-500 text-center py-12">No hay datos de actividades disponibles</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Actividad
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Programa
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                    Inscritos
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                    Asistentes
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                    Horas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {typedActivityData.map((activity) => (
                  <tr key={activity.activityCode} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-sm text-white font-medium">
                      {activity.activityName || activity.activityCode}
                    </td>
                    <td className="py-4 px-4 text-sm text-zinc-300">
                      {activity.programName || activity.programCode}
                    </td>
                    <td className="py-4 px-4 text-sm text-zinc-300 text-right">
                      {activity.totalEnrolled} / {activity.totalCapacity || '∞'}
                    </td>
                    <td className="py-4 px-4 text-sm text-zinc-300 text-right">
                      {activity.totalAttended}
                    </td>
                    <td className="py-4 px-4 text-sm text-yellow-500 font-bold text-right">
                      {activity.totalActivityHours.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReportsPage;
