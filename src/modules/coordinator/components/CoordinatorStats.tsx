import { Briefcase, Users, Clock } from 'lucide-react';
import { AnalyticsCard } from '../../../components';

interface CoordinatorStatsProps {
  programs?: number;
  activeVolunteers?: number;
  totalHours?: number;
  loading?: boolean;
}

export function CoordinatorStats({
  programs = 0,
  activeVolunteers = 0,
  totalHours = 0,
  loading = false,
}: CoordinatorStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AnalyticsCard
        title="Programas Activos"
        value={loading ? '-' : programs}
        icon={<Briefcase size={32} />}
        color="green"
      />
      <AnalyticsCard
        title="Voluntarios Activos"
        value={loading ? '-' : activeVolunteers}
        icon={<Users size={32} />}
        color="blue"
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
