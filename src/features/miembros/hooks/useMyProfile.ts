import { useEffect, useState } from 'react';
import { profilesApi, type UserProfile } from '../services/profileApi';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';

export function useMyProfile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await profilesApi.getMe();
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { data, loading, error };
}
