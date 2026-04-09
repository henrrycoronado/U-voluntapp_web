import { useEffect, useState } from 'react';
import type { Enrollment } from '../api/enrollmentsApi';
import { enrollmentsApi } from '../api/enrollmentsApi';
import { getErrorMessage } from '../../utils/exceptions/errorHandler';

export function useEnrollmentById(id: number) {
  const [data, setData] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEnrollment = async () => {
      try {
        setLoading(true);
        const response = await enrollmentsApi.getById(id);
        setData(response.data as Enrollment);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [id]);

  return { data, loading, error };
}

export function useEnrollmentsByActivity(activityId: number) {
  const [data, setData] = useState<Enrollment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activityId) return;

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await enrollmentsApi.getByActivity(activityId);
        setData(response.data as Enrollment[]);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [activityId]);

  return { data, loading, error };
}

export function useMyEnrollments() {
  const [data, setData] = useState<Enrollment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyEnrollments = async () => {
      try {
        setLoading(true);
        const response = await enrollmentsApi.getMine();
        setData(response.data as Enrollment[]);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEnrollments();
  }, []);

  return { data, loading, error };
}
