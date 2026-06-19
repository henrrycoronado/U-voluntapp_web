export const APP_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  STORAGE_URL: import.meta.env.VITE_STORAGE_URL || '',
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'auth_user',
  THEME_KEY: 'app_theme',
};
