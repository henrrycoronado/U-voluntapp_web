import { useState } from 'react';
import { trackingApi } from '../services/trackingApi';
import type { CheckInRequest, CheckOutRequest } from '../types/tracking.types';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useTracking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkIn = async (data: CheckInRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await trackingApi.checkIn(data);
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const checkOut = async (data: CheckOutRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await trackingApi.checkOut(data);
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkIn, checkOut, isLoading, error };
}
