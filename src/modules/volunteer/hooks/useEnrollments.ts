import { useState, useCallback } from 'react';
import { enrollmentApi } from '../api/enrollmentApi';
import type { EnrollmentResponse } from '../types';
import { AxiosError } from 'axios';

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<EnrollmentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEnrollments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await enrollmentApi.getMyEnrollments();
      setEnrollments(data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Error al cargar las inscripciones.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelEnrollment = async (id: number) => {
    try {
      await enrollmentApi.cancelEnrollment(id);
      await loadEnrollments(); // Recarga la tabla si cancelas con éxito
      return true;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Error al cancelar la inscripción.');
      return false;
    }
  };

  return { enrollments, isLoading, error, loadEnrollments, cancelEnrollment };
};
