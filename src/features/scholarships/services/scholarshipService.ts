import { apiClient } from '../../../core/networks/api/client';
import type {
  ScholarshipDto,
  CreateScholarshipRequestDto,
  CreateScholarshipForProfileDto,
  ReviewScholarshipDto,
  CompleteScholarshipDto,
} from '../types';

export const scholarshipService = {
  request: async (data: CreateScholarshipRequestDto): Promise<void> => {
    await apiClient.post('/v1/scholarships', data);
  },

  assign: async (data: CreateScholarshipForProfileDto): Promise<void> => {
    await apiClient.post('/v1/scholarships/assign', data);
  },

  getByCode: async (uvaCode: string): Promise<ScholarshipDto> =>
    apiClient.get<ScholarshipDto>(`/v1/scholarships/${uvaCode}`).then(r => r.data),

  getMine: async (): Promise<ScholarshipDto[]> =>
    apiClient.get<ScholarshipDto[]>('/v1/scholarships/mine').then(r => r.data),

  getByProfile: async (profileCode: string): Promise<ScholarshipDto[]> =>
    apiClient.get<ScholarshipDto[]>(`/v1/scholarships/by-profile/${profileCode}`).then(r => r.data),

  review: async (uvaCode: string, data: ReviewScholarshipDto): Promise<void> => {
    await apiClient.patch(`/v1/scholarships/${uvaCode}/review`, data);
  },

  complete: async (uvaCode: string, data: CompleteScholarshipDto): Promise<void> => {
    await apiClient.patch(`/v1/scholarships/${uvaCode}/complete`, data);
  },
};
