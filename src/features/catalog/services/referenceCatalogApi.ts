import { apiClient } from '../../../shared/services/client';
import type {
  CreateReferenceTypeRequest,
  ReferenceState,
  ReferenceType,
  UpdateReferenceStateNameRequest,
  UpdateReferenceTypeRequest,
} from '../types/referenceCatalog.types';

export const referenceCatalogApi = {
  getStatesByGroup: (stateGroup: string) =>
    apiClient.get<ReferenceState[]>(`/api/v1/reference-catalog/states/${stateGroup}`),

  updateStateName: (stateGroup: string, stateCode: string, data: UpdateReferenceStateNameRequest) =>
    apiClient.patch<ReferenceState>(
      `/api/v1/reference-catalog/states/${stateGroup}/${stateCode}`,
      data
    ),

  getTypesByGroup: (typeGroup: string) =>
    apiClient.get<ReferenceType[]>(`/api/v1/reference-catalog/types/${typeGroup}`),

  createType: (typeGroup: string, data: CreateReferenceTypeRequest) =>
    apiClient.post<ReferenceType>(`/api/v1/reference-catalog/types/${typeGroup}`, data),

  updateType: (typeGroup: string, typeCode: string, data: UpdateReferenceTypeRequest) =>
    apiClient.patch<ReferenceType>(`/api/v1/reference-catalog/types/${typeGroup}/${typeCode}`, data),
};

export type {
  CreateReferenceTypeRequest,
  ReferenceState,
  ReferenceType,
  UpdateReferenceStateNameRequest,
  UpdateReferenceTypeRequest,
} from '../types/referenceCatalog.types';
