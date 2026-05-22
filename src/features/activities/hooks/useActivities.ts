import { useEffect, useState, useCallback } from 'react';
import type { Activity, CreateActivityRequest, UpdateActivityRequest } from '../services/activitiesApi';
import { activitiesApi } from '../services/activitiesApi';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useActivitiesByProgram(programCode: string | undefined) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    if (!programCode) return;
    try {
      setLoading(true);
      const response = await activitiesApi.getByProgram(programCode);
      setData(response.data as Activity[]);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [programCode]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { data, loading, error, refresh: fetchActivities };
}

export function useActivityByCode(uvaCode: string | undefined) {
  const [data, setData] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    if (!uvaCode) return;
    try {
      setLoading(true);
      const response = await activitiesApi.getById(uvaCode);
      setData(response.data as Activity);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [uvaCode]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return { data, loading, error, refresh: fetchActivity };
}

export function useCreateActivity() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createActivity = async (data: CreateActivityRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await activitiesApi.create(data);
      return response.data;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createActivity, isLoading, error };
}

export function useUpdateActivity() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateActivity = async (uvaCode: string, data: UpdateActivityRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await activitiesApi.update(uvaCode, data);
      return response.data;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateActivity, isLoading, error };
}
