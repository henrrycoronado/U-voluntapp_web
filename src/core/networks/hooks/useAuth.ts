import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../../../core/store/authStore';
import type { LoginRequest, SignupRequest } from '../types';
import { ApiException } from '../../../core/networks/exceptions/api.exceptions';

export const useAuth = () => {
  const { setAuth, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth({
        id: data.uvaCode,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        roles: data.roles,
        token: data.token,
        refreshToken: data.refreshToken,
      });
    },
    onError: (error: ApiException) => {
      console.error('Login Failed', error.message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onError: (error: ApiException) => {
      console.error('Signup Failed', error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: (refreshToken: string) => authService.logout(refreshToken),
    onSettled: () => {
      logout();
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    signup: signupMutation.mutateAsync,
    isSigningUp: signupMutation.isPending,
    signupError: signupMutation.error,

    logout: logoutMutation.mutateAsync,
  };
};
