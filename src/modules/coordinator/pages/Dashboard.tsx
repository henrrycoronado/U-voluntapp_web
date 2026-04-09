import { Shield } from 'lucide-react';
import { useState } from 'react';
import { useCoordinatorData } from '../service/hooks';
import { coordinatorApi } from '../service/api/coordinatorApi';
import { useAuthStore } from '../../../utils/store/authStore';
import { Alert, Button } from '../../../components';
import { CoordinatorStats, CoordinatorQuickActions, RoleRequestModal } from '../components';

export default function Dashboard() {
  const { data, loading, error } = useCoordinatorData();
  const { user } = useAuthStore();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleRequestAdmin = async (reason: string) => {
    await coordinatorApi.requestAdminRole(reason);
  };

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
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-2"
          >
            <Shield size={16} /> Solicitar Admin
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      <CoordinatorStats
        programs={data?.programs || 0}
        activeVolunteers={data?.activeVolunteers || 0}
        totalHours={data?.totalHours || 0}
        loading={loading}
      />

      <CoordinatorQuickActions />

      <RoleRequestModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSubmit={handleRequestAdmin}
        userEmail={user?.email}
      />
    </div>
  );
}
