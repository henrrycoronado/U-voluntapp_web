import { useEffect, useState } from 'react';
import { profilesApi, type UserProfile } from '../services/profileApi';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useMyProfile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profilesApi.getMe();
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (payload: any) => {
    setIsUpdating(true);
    try {
      const response = await profilesApi.updateMe(payload);
      setData(response.data);
      return response.data;
    } finally {
      setIsUpdating(false);
    }
  };

  return { data, loading, error, updateProfile, isUpdating, refresh: fetchProfile };
}
