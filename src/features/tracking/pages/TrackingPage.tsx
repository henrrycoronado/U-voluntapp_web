import React, { useEffect, useState } from 'react';
import { Card } from '../../../core/components/atoms/Card';
import { enrollmentService } from '../../enrollments/services/enrollmentService';
import { trackingService } from '../services/trackingService';
import type { EnrollmentDto } from '../../enrollments/types';
import type { TrackingRecordDto } from '../types';
import {
  History,
  CalendarDays,
  MapPin,
  CheckCircle2,
  CircleDashed,
  Clock,
  XCircle,
} from 'lucide-react';
import { useToastStore } from '../../../core/store/toastStore';

const ENROLLMENT_STATE_MAP: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  'stage-1': {
    label: 'Pendiente',
    color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    icon: Clock,
  },
  'stage-2': {
    label: 'Activo / Aprobado',
    color: 'bg-green-500/20 text-green-500 border-green-500/30',
    icon: CheckCircle2,
  },
  'stage-3': {
    label: 'Rechazado',
    color: 'bg-red-500/20 text-red-500 border-red-500/30',
    icon: XCircle,
  },
  'stage-4': {
    label: 'Cancelado',
    color: 'bg-zinc-500/20 text-zinc-500 border-zinc-500/30',
    icon: XCircle,
  },
};

export const TrackingPage: React.FC = () => {
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEnrollment, setExpandedEnrollment] = useState<string | null>(null);
  const [trackingsCache, setTrackingsCache] = useState<Record<string, TrackingRecordDto[]>>({});
  const [loadingTracking, setLoadingTracking] = useState(false);
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await enrollmentService.getMine();
        // Sort enrollments by date descending
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setEnrollments(sortedData);
      } catch {
        addToast('error', 'Error al cargar el historial de inscripciones');
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [addToast]);

  const handleExpand = async (enrollmentCode: string) => {
    if (expandedEnrollment === enrollmentCode) {
      setExpandedEnrollment(null); // collapse
      return;
    }

    setExpandedEnrollment(enrollmentCode);

    if (!trackingsCache[enrollmentCode]) {
      setLoadingTracking(true);
      try {
        const trackings = await trackingService.getByEnrollment(enrollmentCode);
        // Sort trackings by entry time descending
        const sortedTrackings = trackings.sort(
          (a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime()
        );
        setTrackingsCache((prev) => ({ ...prev, [enrollmentCode]: sortedTrackings }));
      } catch {
        addToast('error', 'Error al cargar los registros de tracking');
      } finally {
        setLoadingTracking(false);
      }
    }
  };

  if (loading) return <div className="text-zinc-500 p-8 text-center">Cargando tu historial...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
        <div className="p-3 bg-yellow-500/10 rounded-xl">
          <History className="w-8 h-8 text-yellow-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Tu Historial</h1>
          <p className="text-zinc-400">
            Revisa todas tus inscripciones (completadas y pendientes) y tus registros de asistencia.
          </p>
        </div>
      </div>

      {enrollments.length === 0 ? (
        <Card className="p-12 text-center text-zinc-500 border-dashed border-2 border-white/10 bg-white/5">
          <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aún no tienes historial de inscripciones en ninguna actividad.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => {
            const isExpanded = expandedEnrollment === enrollment.uvaCode;
            const trackings = trackingsCache[enrollment.uvaCode] || [];
            const stateInfo = ENROLLMENT_STATE_MAP[enrollment.stateCode] || {
              label: enrollment.stateCode,
              color: 'bg-zinc-500/20 text-zinc-500',
              icon: CircleDashed,
            };
            const StatusIcon = stateInfo.icon;

            return (
              <Card
                key={enrollment.uvaCode}
                className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'border-yellow-500/50' : 'hover:border-white/20'}`}
              >
                {/* Header / Summary */}
                <div
                  className="p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => handleExpand(enrollment.uvaCode)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                      <StatusIcon
                        className={`w-6 h-6 ${enrollment.stateCode === 'stage-2' ? 'text-green-500' : 'text-zinc-400'}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {enrollment.activityName || enrollment.activityCode}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md border font-medium ${stateInfo.color}`}
                      >
                        {stateInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="text-xs text-zinc-500">Inscrito el</p>
                    <p className="text-sm text-zinc-300 font-medium">
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Expanded Details: Trackings */}
                {isExpanded && (
                  <div className="p-6 border-t border-white/10 bg-black/40">
                    <h4 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-500" /> Registros de Asistencia (
                      {trackings.length})
                    </h4>

                    {loadingTracking ? (
                      <p className="text-sm text-zinc-500 animate-pulse">Cargando registros...</p>
                    ) : trackings.length === 0 ? (
                      <p className="text-sm text-zinc-500 italic bg-white/5 p-4 rounded-xl border border-white/10">
                        No tienes registros de asistencia (trackings) para esta inscripción.
                      </p>
                    ) : (
                      <div className="relative border-l-2 border-white/10 ml-3 space-y-6">
                        {trackings.map((tracking, idx) => {
                          const isPending = !tracking.exitTime;
                          return (
                            <div key={idx} className="relative pl-6">
                              <div className="absolute -left-[9px] top-1 bg-black p-0.5 rounded-full">
                                {isPending ? (
                                  <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div
                                className={`rounded-xl p-4 border transition-colors ${isPending ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-white/5 border-white/5'}`}
                              >
                                <div className="flex flex-col gap-2 mb-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-md">
                                      Check-In
                                    </span>
                                    <span className="text-xs text-zinc-400 font-medium">
                                      {new Date(tracking.entryTime).toLocaleString()}
                                    </span>
                                  </div>
                                  {tracking.exitTime ? (
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs font-bold px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md">
                                        Check-Out
                                      </span>
                                      <span className="text-xs text-zinc-400 font-medium">
                                        {new Date(tracking.exitTime).toLocaleString()}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="flex justify-between items-center mt-1">
                                      <span className="text-xs font-bold px-2 py-1 bg-red-500/20 text-red-400 rounded-md">
                                        Pendiente Check-Out
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {tracking.latitude !== undefined &&
                                  tracking.longitude !== undefined && (
                                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-3">
                                      <MapPin className="w-3 h-3" /> Lat:{' '}
                                      {tracking.latitude.toFixed(4)}, Lng:{' '}
                                      {tracking.longitude.toFixed(4)}
                                    </p>
                                  )}
                                {tracking.calculatedHours !== undefined &&
                                  tracking.calculatedHours > 0 && (
                                    <p className="text-xs font-medium text-yellow-500 mt-2">
                                      Horas validadas: {tracking.calculatedHours} hrs
                                    </p>
                                  )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
