import { useState, useEffect } from 'react';
import { catalogApi } from '../api/catalogApi';
import { enrollmentApi } from '../api/enrollmentApi';
import type { ProgramResponse, ActivityResponse } from '../types';
import { AxiosError } from 'axios';

export const useProgramExplorer = () => {
  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<ProgramResponse | null>(null);
  const [activities, setActivities] = useState<ActivityResponse[]>([]);

  const [loading, setLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await catalogApi.getPrograms();
        setPrograms(Array.isArray(data) ? data : []);
      } catch {
        setError('Error al cargar los programas disponibles.');
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const handleSelectProgram = async (program: ProgramResponse | null) => {
    setSelectedProgram(program);
    if (!program) return;

    setActivitiesLoading(true);
    setError(null);
    try {
      const data = await catalogApi.getActivitiesByProgram(program.id);
      setActivities(Array.isArray(data) ? data : []);
    } catch {
      setError('Error al cargar las actividades de este programa.');
    } finally {
      setActivitiesLoading(false);
    }
  };

  const handleEnroll = async (activityId: number) => {
    setEnrollingId(activityId);
    try {
      await enrollmentApi.enrollToActivity(activityId);
      alert('¡Inscripción exitosa! Ve a "Mis Inscripciones" para ver los detalles.');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message || 'Error al intentar inscribirte.');
    } finally {
      setEnrollingId(null);
    }
  };

  return {
    programs,
    selectedProgram,
    activities,
    loading,
    activitiesLoading,
    error,
    enrollingId,
    handleSelectProgram,
    handleEnroll,
  };
};
