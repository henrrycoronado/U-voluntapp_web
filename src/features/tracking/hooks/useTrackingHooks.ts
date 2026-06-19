import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trackingService } from '../services/trackingService';
import { enrollmentService } from '../../enrollments/services/enrollmentService';
import type { ManualCheckInDto, ManualCheckOutDto } from '../types';

export const useMyMonthlyTrackings = () => {
  return useQuery({
    queryKey: ['tracking', 'monthly-summary'],
    queryFn: async () => {
      const enrollments = await enrollmentService.getMine();
      const allTrackingsPromises = enrollments.map(e => trackingService.getByEnrollment(e.uvaCode));
      const trackingsArrays = await Promise.all(allTrackingsPromises);
      const trackings = trackingsArrays.flat();

      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const now = new Date();
      const last6Months: { monthIndex: number; year: number; name: string; horas: number }[] = [];
      
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        last6Months.push({ monthIndex: d.getMonth(), year: d.getFullYear(), name: months[d.getMonth()], horas: 0 });
      }

      trackings.forEach(t => {
        if (!t.calculatedHours || !t.entryTime) return;
        const d = new Date(t.entryTime);
        const match = last6Months.find(s => s.monthIndex === d.getMonth() && s.year === d.getFullYear());
        if (match) {
          match.horas += t.calculatedHours;
        }
      });

      return last6Months.map(s => ({ name: s.name, horas: Number(s.horas.toFixed(2)) }));
    }
  });
};

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => trackingService.checkIn(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracking'] });
    },
  });
};

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => trackingService.checkOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracking'] });
    },
  });
};

export const useManualCheckIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ManualCheckInDto) => trackingService.manualCheckIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracking'] });
    },
  });
};

export const useManualCheckOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ManualCheckOutDto) => trackingService.manualCheckOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracking'] });
    },
  });
};

export const useTrackingByEnrollment = (enrollmentCode: string) => {
  return useQuery({
    queryKey: ['tracking', 'enrollment', enrollmentCode],
    queryFn: () => trackingService.getByEnrollment(enrollmentCode),
    enabled: !!enrollmentCode,
  });
};