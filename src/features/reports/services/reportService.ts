import { apiClient } from '../../../core/networks/api/client';
import type { VolunteerHistoryDto } from '../types';

export const reportService = {
  getScholarships: async () =>
    apiClient.get('/v1/reports/scholarships').then(r => r.data),

  getScholarshipsByType: async (scholarshipType: string) =>
    apiClient.get(`/v1/reports/scholarships/by-type/${scholarshipType}`).then(r => r.data),

  getScholarshipsPdf: async (scholarshipType?: string): Promise<Blob> =>
    apiClient.get('/v1/reports/scholarships/pdf', {
      params: scholarshipType ? { scholarshipType } : undefined,
      responseType: 'blob',
    }).then(r => r.data),

  getPrograms: async () =>
    apiClient.get('/v1/reports/programs').then(r => r.data),

  getProgramByCode: async (programCode: string) =>
    apiClient.get(`/v1/reports/programs/${programCode}`).then(r => r.data),

  getActivities: async () =>
    apiClient.get('/v1/reports/activities').then(r => r.data),

  getActivitiesByProgram: async (programCode: string) =>
    apiClient.get(`/v1/reports/activities/by-program/${programCode}`).then(r => r.data),

  getVolunteers: async () =>
    apiClient.get('/v1/reports/volunteers').then(r => r.data),

  getVolunteerByProfile: async (profileCode: string) =>
    apiClient.get(`/v1/reports/volunteers/${profileCode}`).then(r => r.data),

  getMyVolunteerReport: async (): Promise<VolunteerHistoryDto> =>
    apiClient.get<VolunteerHistoryDto>('/v1/reports/volunteers/me').then(r => r.data),

  refresh: async (): Promise<void> => {
    await apiClient.post('/v1/reports/refresh');
  },
};
