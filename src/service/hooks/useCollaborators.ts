import { useEffect, useState } from 'react';
import type { ProgramCollaborator } from '../api/collaboratorsApi';
import { collaboratorsApi } from '../api/collaboratorsApi';

export function useCollaboratorById(id: number) {
  const [data, setData] = useState<ProgramCollaborator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCollaborator = async () => {
      try {
        setLoading(true);
        const response = await collaboratorsApi.getById(id);
        setData(response.data as ProgramCollaborator);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching collaborator');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborator();
  }, [id]);

  return { data, loading, error };
}

export function useCollaboratorsByProgram(programId: number) {
  const [data, setData] = useState<ProgramCollaborator[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) return;

    const fetchCollaborators = async () => {
      try {
        setLoading(true);
        const response = await collaboratorsApi.getByProgram(programId);
        setData(response.data as ProgramCollaborator[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching collaborators');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, [programId]);

  return { data, loading, error };
}
