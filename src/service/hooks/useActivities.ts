import { useEffect, useState } from 'react';
import type { Activity } from '../api/activitiesApi';
import { activitiesApi } from '../api/activitiesApi';
import { getErrorMessage } from '../../utils/exceptions/errorHandler';

export function useActivitiesByProgram(programId: number) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) return;

    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await activitiesApi.getByProgram(programId);
        setData(response.data as Activity[]);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [programId]);

  return { data, loading, error };
}

export function useActivityById(id: number) {
  const [data, setData] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await activitiesApi.getById(id);
        setData(response.data as Activity);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  return { data, loading, error };
}
