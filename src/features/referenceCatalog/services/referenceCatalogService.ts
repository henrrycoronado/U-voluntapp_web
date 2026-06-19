import { apiClient } from '../../../core/networks/api/client';
import type {
  StateDto,
  TypeDto,
  CreateReferenceTypeDto,
  UpdateReferenceTypeDto,
  UpdateReferenceStateNameDto,
} from '../types';

export const referenceCatalogService = {
  getStates: async (stateGroup: string): Promise<StateDto[]> =>
    apiClient.get<StateDto[]>(`/v1/reference-catalog/states/${stateGroup}`).then(r => r.data),

  updateStateName: async (stateGroup: string, stateCode: string, data: UpdateReferenceStateNameDto): Promise<void> => {
    await apiClient.patch(`/v1/reference-catalog/states/${stateGroup}/${stateCode}`, data);
  },

  getTypes: async (typeGroup: string): Promise<TypeDto[]> =>
    apiClient.get<TypeDto[]>(`/v1/reference-catalog/types/${typeGroup}`).then(r => r.data),

  createType: async (typeGroup: string, data: CreateReferenceTypeDto): Promise<void> => {
    await apiClient.post(`/v1/reference-catalog/types/${typeGroup}`, data);
  },

  updateType: async (typeGroup: string, typeCode: string, data: UpdateReferenceTypeDto): Promise<void> => {
    await apiClient.patch(`/v1/reference-catalog/types/${typeGroup}/${typeCode}`, data);
  },
};
