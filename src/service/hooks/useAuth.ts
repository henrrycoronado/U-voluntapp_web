import { useState } from 'react';
import { authApi } from '../api/auth';
import { useAuthStore } from '../../app/store/authStore';
import type { LoginRequest, RegisterRequest } from '../types/auth';
import { getErrorMessage } from '../../utils/exceptions/errorHandler';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authApi.login(data);
      setAuth(user);
      return user;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authApi.register(data);
      setAuth(user);
      return user;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  return { logout };
}
