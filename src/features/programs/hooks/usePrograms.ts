import { useEffect, useState } from 'react';
import type { Program } from '../services/programsApi';
import { programsApi } from '../services/programsApi';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function usePrograms() {
  const [data, setData] = useState<Program[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await programsApi.getAll();
      setData(response.data as Program[]);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { data, loading, error, refresh: fetchPrograms };
}

export function useCreateProgram() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProgram = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await programsApi.create(data);
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProgram, isLoading, error };
}

export function useProgramById(id: string | number | undefined) {
  const [data, setData] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProgram = async () => {
      try {
        setLoading(true);
        const response = await programsApi.getById(id);
        setData(response.data as Program);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  return { data, loading, error };
}
