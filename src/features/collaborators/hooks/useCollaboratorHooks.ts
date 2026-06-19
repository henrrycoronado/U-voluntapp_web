import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collaboratorService } from '../services/collaboratorService';
import type { AddProgramCollaboratorDto, UpdateProgramCollaboratorDto } from '../types';

export const useCollaboratorsByProgram = (programCode: string, stateCode?: string) => {
  return useQuery({
    queryKey: ['collaborators', 'program', programCode, stateCode],
    queryFn: () => collaboratorService.getByProgram(programCode, stateCode),
    enabled: !!programCode,
  });
};

export const useCollaboratorByCode = (uvaCode: string) => {
  return useQuery({
    queryKey: ['collaborators', uvaCode],
    queryFn: () => collaboratorService.getByCode(uvaCode),
    enabled: !!uvaCode,
  });
};

export const useAddCollaborator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddProgramCollaboratorDto) => collaboratorService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
    },
  });
};

export const useUpdateCollaborator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: UpdateProgramCollaboratorDto }) =>
      collaboratorService.update(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      queryClient.invalidateQueries({ queryKey: ['collaborators', uvaCode] });
    },
  });
};

export const useDeleteCollaborator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => collaboratorService.delete(uvaCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['collaborators'] }),
  });
};