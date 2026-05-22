import { apiClient } from '../../../shared/services/client';
import type {
  ActivityReportItem,
  ProgramReportItem,
  ReportRefreshResponse,
  ScholarshipReportItem,
  VolunteerReportItem,
} from '../types/report.types';

export const reportsApi = {
  getScholarships: () => apiClient.get<ScholarshipReportItem[]>('/api/v1/reports/scholarships'),

  getScholarshipsByType: (scholarshipType: string) =>
    apiClient.get<ScholarshipReportItem[]>(`/api/v1/reports/scholarships/by-type/${scholarshipType}`),

  getScholarshipsPdf: (scholarshipType?: string) =>
    apiClient.get<Blob>('/api/v1/reports/scholarships/pdf', {
      params: scholarshipType ? { scholarshipType } : undefined,
      responseType: 'blob',
    }),

  getPrograms: () => apiClient.get<ProgramReportItem[]>('/api/v1/reports/programs'),

  getProgramByCode: (programCode: string) =>
    apiClient.get<ProgramReportItem>(`/api/v1/reports/programs/${programCode}`),

  getActivities: () => apiClient.get<ActivityReportItem[]>('/api/v1/reports/activities'),

  getActivitiesByProgram: (programCode: string) =>
    apiClient.get<ActivityReportItem[]>(`/api/v1/reports/activities/by-program/${programCode}`),

  getVolunteers: () => apiClient.get<VolunteerReportItem[]>('/api/v1/reports/volunteers'),

  getVolunteerByProfile: (profileCode: string) =>
    apiClient.get<VolunteerReportItem>(`/api/v1/reports/volunteers/${profileCode}`),

  refresh: () => apiClient.post<ReportRefreshResponse>('/api/v1/reports/refresh'),
};

export type {
  ActivityReportItem,
  ProgramReportItem,
  ReportRefreshResponse,
  ScholarshipReportItem,
  VolunteerReportItem,
} from '../types/report.types';
