import { useEffect, useState } from 'react';
import type { Program } from '../api/programsApi';
import { programsApi } from '../api/programsApi';

export function usePrograms() {
  const [data, setData] = useState<Program[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await programsApi.getAll();
        setData(response.data as Program[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching programs');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return { data, loading, error };
}

export function useProgramById(id: number) {
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
        setError(err instanceof Error ? err.message : 'Error fetching program');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  return { data, loading, error };
}
