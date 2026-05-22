import { useState, useEffect } from 'react';
import { scholarshipsApi } from '../services/scholarshipsApi';
import type { Scholarship, CreateScholarshipRequest } from '../types/scholarship.types';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useMyScholarships() {
  const [data, setData] = useState<Scholarship[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await scholarshipsApi.getMine();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  return { data, loading, error };
}

export function useCreateScholarship() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createScholarship = async (data: CreateScholarshipRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await scholarshipsApi.create(data);
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createScholarship, isLoading, error };
}
