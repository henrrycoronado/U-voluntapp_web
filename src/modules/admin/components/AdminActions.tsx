import { BarChart3 } from 'lucide-react';
import { Card, Button } from '../../../components';

export function AdminActions() {
  return (
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
  );
}
