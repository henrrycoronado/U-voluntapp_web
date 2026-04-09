import { useFetch } from '../../../../service/hooks/useFetch';
import { adminApi } from '../api/adminApi';
import type { AdminData } from '../types';

export function useAdminData() {
  return useFetch<AdminData>(() => adminApi.getDashboardData());
}
