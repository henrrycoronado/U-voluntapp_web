import { useFetch } from '../../hooks/useFetch';

export const useAllPrograms = () => {
  return useFetch(`/programs`);
};

export const useProgramAnalytics = () => {
  return useFetch(`/reports/programs`);
};

export const useActivityAnalytics = () => {
  return useFetch(`/reports/activities`);
};

export const useScholarshipData = () => {
  return useFetch(`/reports/scholarships`);
};

export const useVolunteerHistory = () => {
  return useFetch(`/reports/volunteers`);
};

export const useActivityAnalyticsByProgram = (programId: number | null) => {
  const url = programId ? `/reports/activities/by-program/${programId}` : null;
  return useFetch(url || '', { enabled: !!programId });
};
