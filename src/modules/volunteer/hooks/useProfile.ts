import { useState, useCallback } from 'react';
import { profileApi } from '../api/profileApi';
import type { ProfileResponse, UpdateProfileRequest } from '../types';
import { AxiosError } from 'axios';

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await profileApi.getMe();
      setProfile(data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Error al cargar los datos del perfil.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = async (payload: UpdateProfileRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedData = await profileApi.updateMe(payload);
      setProfile(updatedData);
      return true;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Error al actualizar el perfil.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await profileApi.deleteMe();
      return true;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Error al eliminar la cuenta.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, isLoading, error, loadProfile, updateProfile, deleteProfile };
};
