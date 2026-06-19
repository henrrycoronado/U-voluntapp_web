import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivityByCode, useChangeActivityState } from '../hooks/useActivityHooks';
import { Button } from '../../../core/components/atoms/Button';
import { RoleGuard } from '../../../core/components/guards/RoleGuard';
import { Modal } from '../../../core/components/molecules/Modal';
import { ActivityForm } from '../components/ActivityForm';
import { useToastStore } from '../../../core/store/toastStore';
import { enrollmentService } from '../../enrollments/services/enrollmentService';
import { useEnrollmentsByActivity } from '../../enrollments/hooks/useEnrollmentHooks';
import { getFullImageUrl } from '../../../core/utils/imageUtils';
import ProfileActivity from '../../../core/assets/ProfileActivity.svg';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  ArrowLeft,
  Calendar,
  Edit,
  MapPin,
  Users,
  Check,
  X,
  ClipboardList,
  Send,
  ArchiveRestore,
  XOctagon,
} from 'lucide-react';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet icon not loading in React
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const STATE_MAP: Record<string, { label: string; color: string }> = {
  'stage-1': { label: 'Inactiva / Borrador', color: 'bg-zinc-500/90 text-white' },
  'stage-2': { label: 'Activa / Publicada', color: 'bg-green-500/90 text-white' },
  'stage-3': { label: 'Eliminada', color: 'bg-red-500/90 text-white' },
  'stage-4': { label: 'Finalizada / Cancelada', color: 'bg-red-500/90 text-white' },
};

export const ActivityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: activity, isLoading, error, refetch } = useActivityByCode(id || '');
  const { data: enrollments = [], refetch: refetchEnrollments } = useEnrollmentsByActivity(
    id || ''
  );
  const { mutate: changeState, isPending: isChangingState } = useChangeActivityState();
  const { addToast } = useToastStore();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is enrolled
    const checkEnrollment = async () => {
      try {
        const mine = await enrollmentService.getMine();
        const found = mine.find((e) => e.activityCode === id && e.stateCode !== 'stage-4'); // assuming stage-4 is cancelled
        if (found) {
          setIsEnrolled(true);
          setEnrollmentId(found.uvaCode);
        } else {
          setIsEnrolled(false);
          setEnrollmentId(null);
        }
      } catch {
        // error fetching
      }
    };
    if (id) checkEnrollment();
  }, [id]);

  if (isLoading) return <div className="text-zinc-500 animate-pulse">Cargando detalles...</div>;
  if (error || !activity) return <div className="text-red-400">Error al cargar la actividad.</div>;

  const isDefaultImage =
    !activity.photoUrl ||
    activity.photoUrl.toLowerCase().includes('default') ||
    activity.photoUrl.toLowerCase().includes('deault');
  const imageSrc = isDefaultImage ? ProfileActivity : getFullImageUrl(activity.photoUrl);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      await enrollmentService.create({ activityCode: activity.uvaCode });
      addToast('success', 'Te has inscrito exitosamente.');
      setIsEnrolled(true);
      refetch();
      refetchEnrollments();
      const mine = await enrollmentService.getMine();
      const found = mine.find((e) => e.activityCode === id && e.stateCode !== 'stage-4');
      if (found) setEnrollmentId(found.uvaCode);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 403) {
        addToast('error', 'No puedes inscribirte: La actividad no está activa.');
      } else if (err.response?.status === 400) {
        addToast('error', 'Ya te encuentras inscrito o no hay vacantes.');
      } else {
        addToast('error', 'Error al inscribirse.');
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleCancelEnroll = async () => {
    if (!enrollmentId) return;
    setIsEnrolling(true);
    try {
      await enrollmentService.cancel(enrollmentId);
      addToast('success', 'Inscripción cancelada.');
      setIsEnrolled(false);
      setEnrollmentId(null);
      refetch();
      refetchEnrollments();
    } catch {
      addToast('error', 'Error al cancelar inscripción.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleStateChange = (newStateCode: string) => {
    changeState(
      { uvaCode: activity.uvaCode, data: { stateCode: newStateCode } },
      {
        onSuccess: () => {
          addToast('success', 'Estado de la actividad actualizado');
          refetch();
        },
        onError: () => addToast('error', 'Error al cambiar estado'),
      }
    );
  };

  const lat = activity.locationLatitude || 0;
  const lng = activity.locationLongitude || 0;
  const hasValidLocation = lat !== 0 && lng !== 0;

  const canCancel = new Date() < new Date(activity.startDate);
  const activeEnrollments = enrollments.filter((e) => e.stateCode !== 'stage-4');

  const stateInfo = STATE_MAP[activity.stateCode] || {
    label: activity.stateCode,
    color: 'bg-zinc-500/90 text-white',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </Button>

      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <img src={imageSrc} alt={activity.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 text-sm rounded-full font-bold shadow-lg ${stateInfo.color}`}
              >
                {stateInfo.label}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">{activity.name}</h1>
          </div>
          <div className="flex gap-4 items-center">
            {isEnrolled === false && activity.stateCode === 'stage-2' && (
              <Button
                variant="primary"
                size="lg"
                className="shadow-yellow-500/20 shadow-lg"
                onClick={handleEnroll}
                isLoading={isEnrolling}
              >
                <Check className="w-5 h-5 mr-2" /> Inscribirme
              </Button>
            )}
            {isEnrolled === true &&
              (canCancel ? (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  onClick={handleCancelEnroll}
                  isLoading={isEnrolling}
                >
                  <X className="w-5 h-5 mr-2" /> Cancelar Inscripción
                </Button>
              ) : (
                <div className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-xl text-sm font-medium">
                  Inscripción Confirmada
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">Detalles de la Actividad</h2>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap mb-6">
              {activity.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t border-white/10 pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 font-medium">Fechas</p>
                  <p className="text-white">
                    {new Date(activity.startDate).toLocaleDateString()} -{' '}
                    {new Date(activity.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400 font-medium">Requisitos</p>
                  <p className="text-white">
                    {activity.requiresEnrollment ? 'Requiere Inscripción' : 'Inscripción Libre'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-yellow-500" /> Lista de Registrados (
              {activeEnrollments.length})
            </h2>
            {activeEnrollments.length === 0 ? (
              <p className="text-zinc-400 text-sm">
                Aún no hay usuarios registrados para esta actividad.
              </p>
            ) : (
              <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {activeEnrollments.map((enr) => (
                  <li
                    key={enr.uvaCode}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5"
                  >
                    <span className="text-white text-sm font-medium">
                      {enr.enrolledProfileName || enr.enrolledProfileCode || 'Usuario sin nombre'}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {new Date(enr.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {hasValidLocation && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-yellow-500" /> Ubicación
              </h2>
              <div className="h-[400px] w-full rounded-xl overflow-hidden border border-white/10">
                <MapContainer
                  center={[lat, lng]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                  <Marker position={[lat, lng]}>
                    <Popup>{activity.name}</Popup>
                  </Marker>
                  <Circle
                    center={[lat, lng]}
                    radius={200}
                    pathOptions={{ color: '#EAB308', fillColor: '#EAB308', fillOpacity: 0.2 }}
                  />
                </MapContainer>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <RoleGuard requiredRoles={['Admin', 'SuperUser', 'Coordinator']}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4">Administración</h3>

              {activity.stateCode === 'stage-1' && (
                <div className="mb-4">
                  <p className="text-xs text-zinc-400 mb-2">
                    La actividad está en borrador y no acepta inscripciones aún.
                  </p>
                  <Button
                    variant="primary"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleStateChange('stage-2')}
                    isLoading={isChangingState}
                  >
                    <Send className="w-4 h-4 mr-2" /> Publicar Actividad
                  </Button>
                </div>
              )}

              {activity.stateCode === 'stage-2' && (
                <div className="mb-4 space-y-3">
                  {activeEnrollments.length === 0 && (
                    <Button
                      variant="outline"
                      className="w-full text-zinc-300 hover:text-white"
                      onClick={() => handleStateChange('stage-1')}
                      isLoading={isChangingState}
                    >
                      <ArchiveRestore className="w-4 h-4 mr-2" /> Volver a Borrador
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                    onClick={() => handleStateChange('stage-4')}
                    isLoading={isChangingState}
                  >
                    <XOctagon className="w-4 h-4 mr-2" /> Finalizar Actividad
                  </Button>
                </div>
              )}

              <Button variant="outline" className="w-full" onClick={() => setEditModalOpen(true)}>
                <Edit className="w-4 h-4 mr-2" /> Editar Actividad
              </Button>
            </div>
          </RoleGuard>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Editar Actividad"
      >
        <ActivityForm
          activityToEdit={activity}
          onSuccess={() => {
            setEditModalOpen(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};

export default ActivityDetailPage;
