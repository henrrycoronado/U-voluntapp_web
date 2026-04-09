import { useEffect, useState } from 'react';
import { coordinatorApi } from '../api/coordinatorApi';
import type { CoordinatorData, Program, Activity, Enrollment } from '../types';
import type { ApiResponse } from '../../../../service/types/api';
import { getErrorMessage } from '../../../../utils/exceptions/errorHandler';

export function useCoordinatorData() {
  const [data, setData] = useState<CoordinatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await coordinatorApi.getDashboardData();
        setData((response as ApiResponse<CoordinatorData>).data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useMyPrograms() {
  const [data, setData] = useState<Program[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await coordinatorApi.getMyPrograms();
        setData((response as ApiResponse<Program[]>).data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useActivitiesByProgram(programId: number | null) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await coordinatorApi.getActivitiesByProgram(programId);
        setData((response as ApiResponse<Activity[]>).data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [programId]);

  return { data, loading, error };
}

export function useEnrollmentsByActivity(activityId: number | null) {
  const [data, setData] = useState<Enrollment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activityId) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await coordinatorApi.getEnrollmentsByActivity(activityId);
        setData((response as ApiResponse<Enrollment[]>).data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activityId]);

  return { data, loading, error };
}
