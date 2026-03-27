import { useFetch } from '../../../hooks/useFetch';

interface CoordinatorData {
  programs: number;
  activeVolunteers: number;
  totalHours: number;
}

export function useCoordinatorData() {
  return useFetch<CoordinatorData>('/api/v1/programs');
}
