import { useFetch } from '../../../hooks/useFetch';

interface VolunteerData {
  enrolledActivities: number;
  hoursCompleted: number;
  scholarships: number;
}

export function useVolunteerData() {
  return useFetch<VolunteerData>('/api/v1/profiles/me');
}
