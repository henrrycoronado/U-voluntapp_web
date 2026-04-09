import { Users, Briefcase, Clock } from 'lucide-react';
import { AnalyticsCard } from '../../../components';

interface DashboardStatsProps {
  totalUsers?: number;
  activePrograms?: number;
  totalHours?: number;
  loading?: boolean;
}

export function DashboardStats({
  totalUsers = 0,
  activePrograms = 0,
  totalHours = 0,
  loading = false,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AnalyticsCard
        title="Usuarios Totales"
        value={loading ? '-' : totalUsers}
        icon={<Users size={32} />}
        color="red"
      />
      <AnalyticsCard
        title="Programas Activos"
        value={loading ? '-' : activePrograms}
        icon={<Briefcase size={32} />}
        color="green"
      />
      <AnalyticsCard
        title="Total Horas"
        value={loading ? '-' : totalHours}
        icon={<Clock size={32} />}
        color="yellow"
      />
    </div>
  );
}
