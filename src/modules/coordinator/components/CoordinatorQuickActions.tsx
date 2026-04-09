import { Card, Button } from '../../../components';

export function CoordinatorQuickActions() {
  return (
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
  );
}
