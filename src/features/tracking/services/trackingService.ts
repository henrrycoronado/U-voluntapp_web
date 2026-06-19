import { apiClient } from '../../../core/networks/api/client';
import type { ManualCheckInDto, ManualCheckOutDto, TrackingRecordDto } from '../types';

export const trackingService = {
  checkIn: async (): Promise<void> => {
    await apiClient.post('/v1/tracking/checkin');
  },

  checkOut: async (): Promise<void> => {
    await apiClient.post('/v1/tracking/checkout');
  },

  manualCheckIn: async (data: ManualCheckInDto): Promise<void> => {
    await apiClient.post('/v1/tracking/manual', data);
  },

  manualCheckOut: async (data: ManualCheckOutDto): Promise<void> => {
    await apiClient.post('/v1/tracking/manual/checkout', data);
  },

  getByCode: async (uvaCode: string): Promise<TrackingRecordDto> =>
    apiClient.get<TrackingRecordDto>(`/v1/tracking/${uvaCode}`).then(r => r.data),

  getByEnrollment: async (enrollmentCode: string): Promise<TrackingRecordDto[]> =>
    apiClient.get<TrackingRecordDto[]>(`/v1/tracking/by-enrollment/${enrollmentCode}`).then(r => r.data),
};
