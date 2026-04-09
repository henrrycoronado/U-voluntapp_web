import { useEffect, useState } from 'react';
import { volunteerApi } from '../api/volunteerApi';
import type { UserProfile, Program, Activity, Enrollment, VolunteerDashboard } from '../types';
import type { ApiResponse } from '../../../../service/types/api';

// Profile hooks
export function useMyProfile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await volunteerApi.getMyProfile();
        setData((response as ApiResponse<UserProfile>).data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching profile');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { data, loading, error };
}

// Program discovery hooks
export function useAvailablePrograms() {
  const [data, setData] = useState<Program[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await volunteerApi.getAllPrograms();
        setData((response as ApiResponse<Program[]>).data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching programs');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return { data, loading, error };
}

// Activity discovery hooks
export function useActivitiesByProgram(programId: number | null) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await volunteerApi.getActivitiesByProgram(programId);
        setData((response as ApiResponse<Activity[]>).data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching activities');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [programId]);

  return { data, loading, error };
}

// Enrollment hooks
export function useMyEnrollments() {
  const [data, setData] = useState<Enrollment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await volunteerApi.getMyEnrollments();
        setData((response as ApiResponse<Enrollment[]>).data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching enrollments');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return { data, loading, error };
}

export function useEnrollmentById(id: number | null) {
  const [data, setData] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchEnrollment = async () => {
      try {
        setLoading(true);
        const response = await volunteerApi.getEnrollmentById(id);
        setData((response as ApiResponse<Enrollment>).data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching enrollment');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [id]);

  return { data, loading, error };
}

// Dashboard hook
export function useVolunteerDashboard() {
  const [data, setData] = useState<VolunteerDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await volunteerApi.getDashboardData();
        setData((response as ApiResponse<VolunteerDashboard>).data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching dashboard');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
}
