import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollmentService } from '../services/enrollmentService';
import type { CreateEnrollmentDto, ReviewEnrollmentDto } from '../types';

export const useEnrollmentByCode = (uvaCode: string) => {
  return useQuery({
    queryKey: ['enrollments', uvaCode],
    queryFn: () => enrollmentService.getByCode(uvaCode),
    enabled: !!uvaCode,
  });
};

export const useEnrollmentsByActivity = (activityCode: string) => {
  return useQuery({
    queryKey: ['enrollments', 'activity', activityCode],
    queryFn: () => enrollmentService.getByActivity(activityCode),
    enabled: !!activityCode,
  });
};

export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ['enrollments', 'mine'],
    queryFn: () => enrollmentService.getMine(),
  });
};

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEnrollmentDto) => enrollmentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments', 'mine'] });
    },
  });
};

export const useReviewEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uvaCode, data }: { uvaCode: string; data: ReviewEnrollmentDto }) =>
      enrollmentService.review(uvaCode, data),
    onSuccess: (_, { uvaCode }) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments', uvaCode] });
    },
  });
};

export const useCancelEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uvaCode: string) => enrollmentService.cancel(uvaCode),
    onSuccess: (_, uvaCode) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments', uvaCode] });
      queryClient.invalidateQueries({ queryKey: ['enrollments', 'mine'] });
    },
  });
};