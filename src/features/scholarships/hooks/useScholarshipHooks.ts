import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scholarshipService } from '../services/scholarshipService';
import type {
  CreateScholarshipRequestDto,
  CreateScholarshipForProfileDto,
  ReviewScholarshipDto,
  CompleteScholarshipDto,
} from '../types';

export const useMyScholarships = () => {
  return useQuery({
    queryKey: ['scholarships', 'mine'],
    queryFn: () => scholarshipService.getMine(),
  });
};

export const useScholarshipsByProfile = (profileCode: string) => {
  return useQuery({
    queryKey: ['scholarships', 'profile', profileCode],
    queryFn: () => scholarshipService.getByProfile(profileCode),
    enabled: !!profileCode,
  });
};

export const useScholarshipByCode = (uvaCode: string) => {
  return useQuery({
    queryKey: ['scholarships', uvaCode],
    queryFn: () => scholarshipService.getByCode(uvaCode),
    enabled: !!uvaCode,
  });
};

export const useRequestScholarship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateScholarshipRequestDto) => scholarshipService.request(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scholarships'] });
    },
  });
};

export const useAssignScholarship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateScholarshipForProfileDto) => scholarshipService.assign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scholarships'] });
    },
  });
};

export const useReviewScholarship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: ReviewScholarshipDto }) =>
      scholarshipService.review(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['scholarships'] });
      queryClient.invalidateQueries({ queryKey: ['scholarships', uvaCode] });
    },
  });
};

export const useCompleteScholarship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: CompleteScholarshipDto }) =>
      scholarshipService.complete(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['scholarships'] });
      queryClient.invalidateQueries({ queryKey: ['scholarships', uvaCode] });
    },
  });
};