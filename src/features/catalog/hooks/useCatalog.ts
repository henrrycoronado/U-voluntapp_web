import { useState, useEffect } from 'react';
import { referenceCatalogApi } from '../services/referenceCatalogApi';
import type { ReferenceState, ReferenceType } from '../types/referenceCatalog.types';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useStatesByGroup(stateGroup: string) {
  const [data, setData] = useState<ReferenceState[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stateGroup) return;

    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await referenceCatalogApi.getStatesByGroup(stateGroup);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [stateGroup]);

  return { data, loading, error };
}

export function useTypesByGroup(typeGroup: string) {
  const [data, setData] = useState<ReferenceType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!typeGroup) return;

    const fetchTypes = async () => {
      try {
        setLoading(true);
        const response = await referenceCatalogApi.getTypesByGroup(typeGroup);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, [typeGroup]);

  return { data, loading, error };
}
