import { useFetch } from '../../../hooks/useFetch';

interface AdminData {
  totalUsers: number;
  activePrograms: number;
  totalHours: number;
}

export function useAdminData() {
  return useFetch<AdminData>('/api/v1/profile');
}
