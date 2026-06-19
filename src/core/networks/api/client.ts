import axios from 'axios';
import { APP_CONFIG } from '../../utils/constants';
import { useToastStore } from '../../store/toastStore';

const getBaseUrl = () => {
  const url = APP_CONFIG.API_URL || '';
  if (url && !url.endsWith('/api')) {
    return url.endsWith('/') ? `${url}api` : `${url}/api`;
  }
  return url;
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const authStorage = localStorage.getItem('auth-store');
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      }
    } catch (error) {
      console.warn('Could not read auth token for request', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { addToast } = useToastStore.getState();
    const errorData = error.response?.data;
    const msg = errorData?.detail || errorData?.title || error.message || 'Error desconocido';

    if (error.response?.status === 401) {
      addToast('error', 'Sesión expirada o no autorizada. Inicia sesión nuevamente.');
    } else if (error.response?.status === 403) {
      addToast('error', 'No tienes permisos para realizar esta acción.');
    } else {
      addToast('error', msg);
    }
    return Promise.reject(error);
  }
);
