import { AxiosError } from 'axios';

export interface ApiErrorDetail {
  code: string;
  message: string;
  field?: string;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    details?: ApiErrorDetail[];
  };
}

export class ApiException extends Error {
  public status: number;
  public details?: ApiErrorDetail[];

  constructor(message: string, status: number, details?: ApiErrorDetail[]) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.details = details;
  }
}

export const handleApiError = (error: unknown): ApiException => {
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const data = error.response?.data as ApiErrorResponse;
    const message = data?.error?.message || error.message || 'Error inesperado de red';
    const details = data?.error?.details;
    return new ApiException(message, status, details);
  }

  if (error instanceof Error) {
    return new ApiException(error.message, 500);
  }

  return new ApiException('Error desconocido', 500);
};
