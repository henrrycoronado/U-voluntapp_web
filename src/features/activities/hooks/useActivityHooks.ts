import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activityService } from '../services/activityService';
import type { CreateActivityDto, CreateActivitySimpleDto, UpdateActivityDto, ChangeActivityStateDto } from '../types';

export const useActivitiesByProgram = (programCode: string) => {
  return useQuery({
    queryKey: ['activities', 'program', programCode],
    queryFn: () => activityService.getByProgram(programCode),
    enabled: !!programCode,
  });
};

export const useActivityByCode = (uvaCode: string) => {
  return useQuery({
    queryKey: ['activities', uvaCode],
    queryFn: () => activityService.getByCode(uvaCode),
    enabled: !!uvaCode,
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateActivityDto) => activityService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};

export const useCreateActivitySimple = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateActivitySimpleDto) => activityService.createSimple(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: UpdateActivityDto }) =>
      activityService.update(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities', uvaCode] });
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => activityService.delete(uvaCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};

export const useChangeActivityState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: ChangeActivityStateDto }) =>
      activityService.changeState(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities', uvaCode] });
    },
  });
};