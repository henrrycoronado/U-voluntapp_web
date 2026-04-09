import { useEffect, useState } from 'react';
import type { RoleRequest } from '../api/roleRequestsApi';
import { roleRequestsApi } from '../api/roleRequestsApi';

export function usePendingCoordinatorRequests() {
  const [data, setData] = useState<RoleRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await roleRequestsApi.getPendingCoordinator();
        setData(response.data as RoleRequest[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching pending requests');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { data, loading, error };
}

export function usePendingAdminRequests() {
  const [data, setData] = useState<RoleRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await roleRequestsApi.getPendingAdmin();
        setData(response.data as RoleRequest[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching pending requests');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { data, loading, error };
}
