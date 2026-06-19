import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '../services/reportService';

export const useScholarshipsReport = () => {
  return useQuery({
    queryKey: ['reports', 'scholarships'],
    queryFn: () => reportService.getScholarships(),
  });
};

export const useScholarshipsByTypeReport = (scholarshipType: string) => {
  return useQuery({
    queryKey: ['reports', 'scholarships', 'type', scholarshipType],
    queryFn: () => reportService.getScholarshipsByType(scholarshipType),
    enabled: !!scholarshipType,
  });
};

export const useProgramsReport = () => {
  return useQuery({
    queryKey: ['reports', 'programs'],
    queryFn: () => reportService.getPrograms(),
  });
};

export const useProgramReportById = (programCode: string) => {
  return useQuery({
    queryKey: ['reports', 'programs', programCode],
    queryFn: () => reportService.getProgramByCode(programCode),
    enabled: !!programCode,
  });
};

export const useActivitiesReport = () => {
  return useQuery({
    queryKey: ['reports', 'activities'],
    queryFn: () => reportService.getActivities(),
  });
};

export const useActivitiesByProgramReport = (programCode: string) => {
  return useQuery({
    queryKey: ['reports', 'activities', 'program', programCode],
    queryFn: () => reportService.getActivitiesByProgram(programCode),
    enabled: !!programCode,
  });
};

export const useVolunteersReport = () => {
  return useQuery({
    queryKey: ['reports', 'volunteers'],
    queryFn: () => reportService.getVolunteers(),
  });
};

export const useVolunteerReportById = (profileCode: string) => {
  return useQuery({
    queryKey: ['reports', 'volunteers', profileCode],
    queryFn: () => reportService.getVolunteerByProfile(profileCode),
    enabled: !!profileCode,
  });
};

export const useMyVolunteerReport = () => {
  return useQuery({
    queryKey: ['reports', 'volunteers', 'me'],
    queryFn: () => reportService.getMyVolunteerReport(),
  });
};

export const useRefreshReports = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => reportService.refresh(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};