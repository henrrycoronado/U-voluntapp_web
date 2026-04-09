import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export interface RoleRequest {
  id: number;
  requestingProfileId: string;
  requestingProfileName: string;
  requestingProfileEmail: string;
  requestedRole: 'Coordinator' | 'Admin';
  state: string;
  reason?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface CreateCoordinatorRoleRequest {
  reason?: string;
}

export interface CreateAdminRoleRequest {
  reason?: string;
}

export interface RejectRoleRequestRequest {
  reason?: string;
}

export const roleRequestsApi = {
  // Get pending coordinator role requests (Admin, SuperUser)
  getPendingCoordinator: () =>
    apiClient.get<ApiResponse<RoleRequest[]>>('/api/v1/roles/requests/coordinator'),

  // Get pending admin role requests (SuperUser)
  getPendingAdmin: () => apiClient.get<ApiResponse<RoleRequest[]>>('/api/v1/roles/requests/admin'),

  // Request coordinator role (Volunteer)
  requestCoordinator: (data: CreateCoordinatorRoleRequest = {}) =>
    apiClient.post<ApiResponse<RoleRequest>>('/api/v1/roles/requests/coordinator', data),

  // Request admin role (Coordinator, Admin, SuperUser)
  requestAdmin: (data: CreateAdminRoleRequest = {}) =>
    apiClient.post<ApiResponse<RoleRequest>>('/api/v1/roles/requests/admin', data),

  // Approve coordinator role request (Admin, SuperUser)
  approveCoordinator: (id: number) =>
    apiClient.post<ApiResponse<RoleRequest>>(
      `/api/v1/roles/requests/${id}/coordinator/approve`,
      {}
    ),

  // Reject coordinator role request (Admin, SuperUser)
  rejectCoordinator: (id: number, data?: RejectRoleRequestRequest) =>
    apiClient.post<ApiResponse<RoleRequest>>(
      `/api/v1/roles/requests/${id}/coordinator/reject`,
      data
    ),

  // Approve admin role request (SuperUser)
  approveAdmin: (id: number) =>
    apiClient.post<ApiResponse<RoleRequest>>(`/api/v1/roles/requests/${id}/admin/approve`, {}),

  // Reject admin role request (SuperUser)
  rejectAdmin: (id: number, data?: RejectRoleRequestRequest) =>
    apiClient.post<ApiResponse<RoleRequest>>(`/api/v1/roles/requests/${id}/admin/reject`, data),
};
