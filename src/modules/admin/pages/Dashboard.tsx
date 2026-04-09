import { useAdminData } from '../service/hooks';
import { Alert, Button } from '../../../components';
import { DashboardStats, AdminActions, ProgramsList } from '../components';
import type { Program } from '../types';

export default function Dashboard() {
  const { data, loading, error } = useAdminData();

  const handleEditProgram = (program: Program) => {
    // TODO: Open program edit modal
    console.log('Edit program:', program);
  };

  const handleCreateActivity = (programId: number) => {
    // TODO: Open activity creation modal
    console.log('Create activity for program:', programId);
  };

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

      <DashboardStats
        totalUsers={data?.totalUsers || 0}
        activePrograms={data?.activePrograms || 0}
        totalHours={data?.totalHours || 0}
        loading={loading}
      />

      <ProgramsList onEditProgram={handleEditProgram} onCreateActivity={handleCreateActivity} />

      <AdminActions />
    </div>
  );
}
