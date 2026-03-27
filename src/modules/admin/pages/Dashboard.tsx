import { Users, Briefcase, Clock, BarChart3 } from 'lucide-react';
import { useAdminData } from '../api/hooks';
import { Alert, AnalyticsCard, Card, Button } from '../../../components';

export default function Dashboard() {
  const { data, loading, error } = useAdminData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de Administrador</h1>
        <div className="flex gap-2">
          <Button variant="primary" size="sm">
            Generar Reportes
          </Button>
          <Button variant="secondary" size="sm">
            Configuración
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Usuarios Totales"
          value={loading ? '-' : data?.totalUsers || 0}
          icon={<Users size={32} />}
          color="red"
        />
        <AnalyticsCard
          title="Programas Activos"
          value={loading ? '-' : data?.activePrograms || 0}
          icon={<Briefcase size={32} />}
          color="green"
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Acciones Administrativas
            </h3>
          </div>
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              Gestionar Usuarios
            </Button>
            <Button variant="secondary" className="w-full">
              Revisar Becas
            </Button>
            <Button variant="secondary" className="w-full">
              Requests de Coordinador
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Análisis del Sistema
            </h3>
          </div>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full flex items-center gap-2">
              <BarChart3 size={18} />
              Ver Reportes
            </Button>
            <Button variant="secondary" className="w-full">
              Exportar Datos
            </Button>
            <Button variant="secondary" className="w-full">
              Auditoría del Sistema
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
