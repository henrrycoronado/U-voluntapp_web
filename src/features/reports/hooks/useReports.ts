import { useState, useEffect } from 'react';
import { reportsApi } from '../services/reportsApi';
import type { ProgramReportItem, ScholarshipReportItem } from '../types/report.types';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useProgramReports() {
  const [data, setData] = useState<ProgramReportItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await reportsApi.getPrograms();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { data, loading, error };
}

export function useScholarshipReports() {
  const [data, setData] = useState<ScholarshipReportItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await reportsApi.getScholarships();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { data, loading, error };
}
