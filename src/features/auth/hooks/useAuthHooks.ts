import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { LoginRequest, RegisterRequest, RefreshTokenRequest, LogoutRequest } from '../types';

export const useLogin = () =>
  useMutation({ mutationFn: (data: LoginRequest) => authService.login(data) });

export const useRegister = () =>
  useMutation({ mutationFn: (data: RegisterRequest) => authService.register(data) });

export const useRefresh = () =>
  useMutation({ mutationFn: (data: RefreshTokenRequest) => authService.refresh(data) });

export const useLogout = () =>
  useMutation({ mutationFn: (data: LogoutRequest) => authService.logout(data) });
