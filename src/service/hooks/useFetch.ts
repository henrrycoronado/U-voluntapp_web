import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { getErrorMessage } from '../../utils/exceptions/errorHandler';

interface UseFetchOptions {
  enabled?: boolean;
}

interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.enabled === false) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<ApiResponse<T>>(url);
        setData(response.data.data as T);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options.enabled]);

  return { data, loading, error };
}
