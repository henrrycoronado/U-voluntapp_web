import { useEffect, useState } from 'react';
import type { AxiosResponse } from 'axios';
import { adminApi } from '../api/adminApi';
import type { AdminData, ProgramAnalytics, ActivityAnalytics, VolunteerHistory } from '../types';
import type { ApiResponse } from '../../../../service/types/api';
import { getErrorMessage } from '../../../../utils/exceptions/errorHandler';

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
