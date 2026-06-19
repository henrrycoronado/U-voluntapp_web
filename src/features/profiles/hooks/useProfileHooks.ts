import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import type {  UpdateProfileDto  } from '../types';

export const useMe = () => {
  return useQuery({ queryKey: ['me'], queryFn: () => profileService.getMe() });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileDto) => profileService.updateMe(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
  });
};

export const useProfileByCode = (uvaCode: string) => {
  return useQuery({ queryKey: ['profile', uvaCode], queryFn: () => profileService.getByCode(uvaCode), enabled: !!uvaCode });
};

export const useUpdatePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => profileService.updatePhoto(file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
  });
};