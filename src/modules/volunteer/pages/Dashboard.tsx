import { AlertCircle, Award, Clock, Zap, User, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { useVolunteerData } from '../api/hooks';
import { useRequestCoordinatorRole } from '../hooks/hooks';
import { useAuthStore } from '../../../store/authStore';
import { Alert, AnalyticsCard, Card, Button, Modal, TextArea } from '../../../components';

// Importamos nuestros nuevos componentes (ahora con la ruta correcta)
import { ProfileForm } from '../components/ProfileForm';
import { MyEnrollments } from '../components/MyEnrollments';

export default function Dashboard() {
  const { data, loading, error } = useVolunteerData();
  const { user } = useAuthStore();
  const requestCoordinator = useRequestCoordinatorRole();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleRequest, setRoleRequest] = useState({ reason: '', months: 12 });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Estados simples para mostrar/ocultar nuestras nuevas secciones
  const [activeSection, setActiveSection] = useState<'overview' | 'enrollments' | 'profile'>(
    'overview'
  );

  const handleRequestCoordinator = async () => {
    if (!roleRequest.reason.trim() || !user?.email) {
      setMessage({ type: 'error', text: 'Por favor explica tu motivo' });
      return;
    }
    setSubmitting(true);
    try {
      await requestCoordinator(user.email, roleRequest.reason, roleRequest.months);
      setMessage({
        type: 'success',
        text: '✓ Solicitud enviada exitosamente. Espera aprobación de un Admin.',
      });
      setRoleRequest({ reason: '', months: 12 });
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
      {/* CABECERA ORIGINAL */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de Voluntario</h1>
        <div className="flex gap-2">
          {/* Botones de navegación para nuestras secciones */}
          <Button
            variant={activeSection === 'overview' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveSection('overview')}
          >
            Vista General
          </Button>
          <Button
            variant={activeSection === 'enrollments' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveSection('enrollments')}
            className="flex items-center gap-2"
          >
            <ClipboardList size={16} /> Mis Inscripciones
          </Button>
          <Button
            variant={activeSection === 'profile' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveSection('profile')}
            className="flex items-center gap-2"
          >
            <User size={16} /> Mi Perfil
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-2"
          >
            <Zap size={16} /> Solicitar Coordinador
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      {/* SECCIÓN 1: VISTA GENERAL (Código original de tu amigo) */}
      {activeSection === 'overview' && (
        <>
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
        </>
      )}

      {/* SECCIÓN 2: NUESTRAS INSCRIPCIONES */}
      {activeSection === 'enrollments' && (
        <div className="mt-6">
          <MyEnrollments />
        </div>
      )}

      {/* SECCIÓN 3: NUESTRO PERFIL */}
      {activeSection === 'profile' && (
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-3xl">
            <ProfileForm />
          </div>
        </div>
      )}

      {/* MODAL ORIGINAL DE TU AMIGO */}
      <Modal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        size="md"
        title="Solicitar ser Coordinador"
      >
        {message && <Alert type={message.type} message={message.text} />}
        <div className="space-y-4">
          <TextArea
            label="Motivo de la solicitud"
            placeholder="Explica por qué quieres ser coordinador..."
            value={roleRequest.reason}
            onChange={(e) => setRoleRequest({ ...roleRequest, reason: e.target.value })}
            rows={4}
          />
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Duración (meses)
            </label>
            <input
              type="number"
              value={roleRequest.months}
              onChange={(e) => setRoleRequest({ ...roleRequest, months: parseInt(e.target.value) })}
              min={1}
              max={36}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleRequestCoordinator} disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
