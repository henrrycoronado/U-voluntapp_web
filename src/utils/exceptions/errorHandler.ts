import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<{
      message?: string;
      Message?: string;
      errors?: string[];
    }>;

    if (axiosError.response?.data) {
      const data = axiosError.response.data;

      if (data.message) return data.message;
      if (data.Message) return data.Message;

      if (data.errors && data.errors.length > 0) return data.errors[0];
    }

    return axiosError.message;
  }

  if (error instanceof Error) return error.message;

  return 'Ocurrió un error inesperado. Por favor, revisa tu conexión e inténtalo de nuevo.';
};
