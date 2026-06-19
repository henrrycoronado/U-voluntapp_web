import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { referenceCatalogService } from '../services/referenceCatalogService';
import type { CreateReferenceTypeDto, UpdateReferenceTypeDto, UpdateReferenceStateNameDto } from '../types';

export const useStatesByGroup = (group: string) => {
  return useQuery({
    queryKey: ['states', group],
    queryFn: () => referenceCatalogService.getStates(group),
    enabled: !!group,
  });
};

export const useTypesByGroup = (group: string) => {
  return useQuery({
    queryKey: ['types', group],
    queryFn: () => referenceCatalogService.getTypes(group),
    enabled: !!group,
  });
};

export const useUpdateStateName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ stateGroup, stateCode, data }: { stateGroup: string; stateCode: string; data: UpdateReferenceStateNameDto }) =>
      referenceCatalogService.updateStateName(stateGroup, stateCode, data),
    onSuccess: (_, { stateGroup }) => {
      queryClient.invalidateQueries({ queryKey: ['states', stateGroup] });
    },
  });
};

export const useCreateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ typeGroup, data }: { typeGroup: string; data: CreateReferenceTypeDto }) =>
      referenceCatalogService.createType(typeGroup, data),
    onSuccess: (_, { typeGroup }) => {
      queryClient.invalidateQueries({ queryKey: ['types', typeGroup] });
    },
  });
};

export const useUpdateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ typeGroup, typeCode, data }: { typeGroup: string; typeCode: string; data: UpdateReferenceTypeDto }) =>
      referenceCatalogService.updateType(typeGroup, typeCode, data),
    onSuccess: (_, { typeGroup }) => {
      queryClient.invalidateQueries({ queryKey: ['types', typeGroup] });
    },
  });
};