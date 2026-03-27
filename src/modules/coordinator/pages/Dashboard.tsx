import { Briefcase, Users, Clock } from 'lucide-react';
import { useCoordinatorData } from '../api/hooks';
import { Alert, AnalyticsCard, Card, Button } from '../../../components';

export default function Dashboard() {
  const { data, loading, error } = useCoordinatorData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de Coordinador</h1>
        <div className="flex gap-2">
          <Button variant="success" size="sm">
            Nuevo Programa
          </Button>
          <Button variant="primary" size="sm">
            Nueva Actividad
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Programas Activos"
          value={loading ? '-' : data?.programs || 0}
          icon={<Briefcase size={32} />}
          color="green"
        />
        <AnalyticsCard
          title="Voluntarios Activos"
          value={loading ? '-' : data?.activeVolunteers || 0}
          icon={<Users size={32} />}
          color="blue"
        />
        <AnalyticsCard
          title="Total Horas"
          value={loading ? '-' : data?.totalHours || 0}
          icon={<Clock size={32} />}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gestión Rápida</h3>
          </div>
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              Mis Programas
            </Button>
            <Button variant="secondary" className="w-full">
              Revisar Inscripciones
            </Button>
            <Button variant="secondary" className="w-full">
              Registrar Asistencia
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Estadísticas</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>✓ Inscripciones pendientes: -</p>
            <p>⏳ Actividades en progreso: -</p>
            <p>📈 Promedio de voluntarios: -</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
