import { Briefcase, Users, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import { useCoordinatorData } from '../api/hooks';
import { useRequestAdminRole } from '../hooks';
import { useAuthStore } from '../../../store/authStore';
import { Alert, AnalyticsCard, Card, Button, Modal, TextArea } from '../../../components';

export default function Dashboard() {
  const { data, loading, error } = useCoordinatorData();
  const { user } = useAuthStore();
  const requestAdmin = useRequestAdminRole();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleRequest, setRoleRequest] = useState({ reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRequestAdmin = async () => {
    if (!roleRequest.reason.trim() || !user?.email) {
      setMessage({ type: 'error', text: 'Por favor explica tu motivo' });
      return;
    }
    setSubmitting(true);
    try {
      await requestAdmin(user.email, roleRequest.reason);
      setMessage({
        type: 'success',
        text: '✓ Solicitud enviada exitosamente. Espera aprobación de SuperUser.',
      });
      setRoleRequest({ reason: '' });
      setTimeout(() => setShowRoleModal(false), 2000);
    } catch (err) {
      setMessage({
        type: 'error',
        text: `Error: ${err instanceof Error ? err.message : 'No se pudo enviar la solicitud'}`,
      });
    } finally {
      setSubmitting(false);
    }
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

      <Modal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        size="md"
        title="Solicitar ser Administrador"
      >
        {message && <Alert type={message.type} message={message.text} />}
        <div className="space-y-4 mt-6">
          <TextArea
            label="Motivo de la solicitud"
            placeholder="Explica por qué quieres ser administrador..."
            value={roleRequest.reason}
            onChange={(e) => setRoleRequest({ reason: e.target.value })}
            rows={4}
          />
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleRequestAdmin} disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
