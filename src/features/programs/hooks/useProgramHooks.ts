import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { programService } from '../services/programService';
import type { CreateProgramDto, UpdateProgramDto, ChangeVolProgramStateDto } from '../types';

export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: () => programService.getAll(),
  });
};

export const useProgramByCode = (uvaCode: string) => {
  return useQuery({
    queryKey: ['programs', uvaCode],
    queryFn: () => programService.getByCode(uvaCode),
    enabled: !!uvaCode,
  });
};

export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProgramDto) => programService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: UpdateProgramDto }) =>
      programService.update(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['programs', uvaCode] });
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => programService.delete(uvaCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['programs'] }),
  });
};

export const useChangeProgramState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: ChangeVolProgramStateDto }) =>
      programService.changeState(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['programs', uvaCode] });
    },
  });
};