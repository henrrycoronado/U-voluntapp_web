import { apiClient } from '../../../shared/services/client';
import type {
  CheckInRequest,
  CheckOutRequest,
  ManualCheckInRequest,
  ManualCheckOutRequest,
  TrackingLog,
} from '../types/tracking.types';

export const trackingApi = {
  checkIn: (data: CheckInRequest) => apiClient.post<TrackingLog>('/api/v1/tracking/checkin', data),

  checkOut: (data: CheckOutRequest) =>
    apiClient.post<TrackingLog>('/api/v1/tracking/checkout', data),

  manualCheckIn: (data: ManualCheckInRequest) =>
    apiClient.post<TrackingLog>('/api/v1/tracking/manual', data),

  manualCheckOut: (data: ManualCheckOutRequest) =>
    apiClient.post<TrackingLog>('/api/v1/tracking/manual/checkout', data),

  getById: (uvaCode: string | number) => apiClient.get<TrackingLog>(`/api/v1/tracking/${uvaCode}`),

  getByEnrollment: (enrollmentCode: string | number) =>
    apiClient.get<TrackingLog[]>(`/api/v1/tracking/by-enrollment/${enrollmentCode}`),
};

export type {
  CheckInRequest,
  CheckOutRequest,
  ManualCheckInRequest,
  ManualCheckOutRequest,
  TrackingLog,
} from '../types/tracking.types';
