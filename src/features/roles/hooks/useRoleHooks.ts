import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../services/roleService';
import type { CreateRoleRequestDto } from '../types';

export const useRequestCoordinator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleRequestDto) => roleService.requestCoordinator(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  });
};

export const useRequestAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleRequestDto) => roleService.requestAdmin(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  });
};

export const useCoordinatorRequests = () => {
  return useQuery({
    queryKey: ['roles', 'coordinator'],
    queryFn: () => roleService.getCoordinatorRequests(),
  });
};

export const useAdminRequests = () => {
  return useQuery({
    queryKey: ['roles', 'admin'],
    queryFn: () => roleService.getAdminRequests(),
  });
};

export const useApproveCoordinator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => roleService.approveCoordinator(uvaCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  });
};

export const useRejectCoordinator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => roleService.rejectCoordinator(uvaCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  });
};

export const useApproveAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => roleService.approveAdmin(uvaCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  });
};

export const useRejectAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => roleService.rejectAdmin(uvaCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  });
};