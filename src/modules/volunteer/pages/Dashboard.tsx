import { AlertCircle, Award, Clock } from 'lucide-react';
import { useVolunteerData } from '../api/hooks';
import { Alert, AnalyticsCard, Card, Button } from '../../../components';

export default function Dashboard() {
  const { data, loading, error } = useVolunteerData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de Voluntario</h1>
        <div className="flex gap-2">
          <Button variant="primary" size="sm">
            Nuevo Programa
          </Button>
          <Button variant="secondary" size="sm">
            Mis Inscripciones
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Actividades Inscritas"
          value={loading ? '-' : data?.enrolledActivities || 0}
          icon={<AlertCircle size={32} />}
          color="blue"
        />
        <AnalyticsCard
          title="Horas Completadas"
          value={loading ? '-' : data?.hoursCompleted || 0}
          icon={<Clock size={32} />}
          color="green"
        />
        <AnalyticsCard
          title="Becas Obtenidas"
          value={loading ? '-' : data?.scholarships || 0}
          icon={<Award size={32} />}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Acciones Rápidas
            </h3>
          </div>
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              Explorar Programas
            </Button>
            <Button variant="secondary" className="w-full">
              Ver mis Becas
            </Button>
            <Button variant="secondary" className="w-full">
              Registrar Check-in
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Información</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>📅 Próxima actividad: Por confirmar</p>
            <p>⏱️ Horas pendientes: -</p>
            <p>📊 Progreso general: {loading ? '-' : '0%'}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
