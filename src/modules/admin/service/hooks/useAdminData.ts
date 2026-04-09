import { useEffect, useState } from 'react';
import type { AxiosResponse } from 'axios';
import { adminApi } from '../api/adminApi';
import type { AdminData, ProgramAnalytics, ActivityAnalytics, VolunteerHistory } from '../types';
import type { ApiResponse } from '../../../../service/types/api';

export function useAdminData() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminApi.getDashboardData();
        setData((response as unknown as AxiosResponse<ApiResponse<AdminData>>).data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching dashboard data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useProgramAnalytics() {
  const [data, setData] = useState<ProgramAnalytics[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminApi.getProgramAnalytics();
        setData((response as unknown as AxiosResponse<ApiResponse<ProgramAnalytics[]>>).data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching program analytics');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useActivityAnalytics() {
  const [data, setData] = useState<ActivityAnalytics[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminApi.getActivityAnalytics();
        setData((response as unknown as AxiosResponse<ApiResponse<ActivityAnalytics[]>>).data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching activity analytics');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useVolunteerHistory() {
  const [data, setData] = useState<VolunteerHistory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminApi.getVolunteerHistory();
        setData((response as unknown as AxiosResponse<ApiResponse<VolunteerHistory[]>>).data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching volunteer history');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
