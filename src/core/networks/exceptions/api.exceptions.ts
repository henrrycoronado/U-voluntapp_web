import { AxiosError } from 'axios';

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

export class ApiException extends Error {
  public status: number;
  public problemDetails?: ProblemDetails;

  constructor(message: string, status: number, problemDetails?: ProblemDetails) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.problemDetails = problemDetails;
  }
}

export const handleApiError = (error: unknown): ApiException => {
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const data = error.response?.data as ProblemDetails | undefined;
    const message = data?.detail || data?.title || error.message || 'Error inesperado de red';
    return new ApiException(message, status, data);
  }

  if (error instanceof Error) {
    return new ApiException(error.message, 500);
  }

  return new ApiException('Error desconocido', 500);
};
