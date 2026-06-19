import axios from 'axios';
import { APP_CONFIG } from '../../utils/constants';

export const apiClient = axios.create({
  baseURL: APP_CONFIG.API_URL,
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
    if (error.response?.status === 401) {
      console.warn('Unauthorized request. Token might be invalid or expired.');
    }
    return Promise.reject(error);
  }
);
