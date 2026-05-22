import { useState, useEffect, useCallback } from 'react';
import { enrollmentsApi } from '../services/enrollmentsApi';
import type { 
  CreateEnrollmentRequest, 
  Enrollment, 
  ReviewEnrollmentRequest, 
  CancelEnrollmentRequest 
} from '../types/enrollment.types';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useCreateEnrollment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEnrollment = async (data: CreateEnrollmentRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await enrollmentsApi.create(data);
      return response.data;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createEnrollment, isLoading, error };
}

export function useMyEnrollments() {
  const [data, setData] = useState<Enrollment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await enrollmentsApi.getMine();
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return { data, loading, error, refresh: fetchEnrollments };
}

export function useEnrollmentsByActivity(activityCode: string | undefined) {
  const [data, setData] = useState<Enrollment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async () => {
    if (!activityCode) return;
    try {
      setLoading(true);
      const response = await enrollmentsApi.getByActivity(activityCode);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [activityCode]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return { data, loading, error, refresh: fetchEnrollments };
}

export function useReviewEnrollment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reviewEnrollment = async (uvaCode: string, data: ReviewEnrollmentRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await enrollmentsApi.review(uvaCode, data);
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { reviewEnrollment, isLoading, error };
}

export function useCancelEnrollment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelEnrollment = async (uvaCode: string, data?: CancelEnrollmentRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await enrollmentsApi.cancel(uvaCode, data);
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { cancelEnrollment, isLoading, error };
}
