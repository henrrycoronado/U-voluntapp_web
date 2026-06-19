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
    apiClient.get(`/v1/reference-catalog/states/${stateGroup}`).then((r) => {
      if (Array.isArray(r.data)) return r.data;
      if (r.data && Array.isArray(r.data.data)) return r.data.data;
      return [];
    }),

  updateStateName: async (
    stateGroup: string,
    stateCode: string,
    data: UpdateReferenceStateNameDto
  ): Promise<void> => {
    await apiClient.patch(`/v1/reference-catalog/states/${stateGroup}/${stateCode}`, data);
  },

  getTypes: async (typeGroup: string): Promise<TypeDto[]> =>
    apiClient.get(`/v1/reference-catalog/types/${typeGroup}`).then((r) => {
      if (Array.isArray(r.data)) return r.data;
      if (r.data && Array.isArray(r.data.data)) return r.data.data;
      return [];
    }),

  createType: async (typeGroup: string, data: CreateReferenceTypeDto): Promise<void> => {
    await apiClient.post(`/v1/reference-catalog/types/${typeGroup}`, data);
  },

  updateType: async (
    typeGroup: string,
    typeCode: string,
    data: UpdateReferenceTypeDto
  ): Promise<void> => {
    await apiClient.patch(`/v1/reference-catalog/types/${typeGroup}/${typeCode}`, data);
  },
};
