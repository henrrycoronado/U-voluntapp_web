import type { AxiosError } from 'axios';
import { getErrorMessage } from './errorHandler';

export class AdminException extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly originalError?: unknown;

  constructor(
    message: string,
    code: string = 'ADMIN_ERROR',
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'AdminException';
    this.code = code;
    this.statusCode = statusCode;
    this.originalError = originalError;
    Object.setPrototypeOf(this, AdminException.prototype);
  }
}

const getAdminErrorCode = (statusCode?: number): string => {
  switch (statusCode) {
    case 400:
      return 'VALIDATION_ERROR';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 409:
      return 'CONFLICT';
    case 422:
      return 'UNPROCESSABLE_ENTITY';
    case 500:
      return 'SERVER_ERROR';
    default:
      return 'AXIOS_ERROR';
  }
};

export const handleAdminError = (error: unknown): AdminException => {
  if (error instanceof AdminException) {
    return error;
  }

  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status;
    const message = getErrorMessage(error);
    const code = getAdminErrorCode(statusCode);

    return new AdminException(message, code, statusCode, error);
  }

  if (error instanceof Error) {
    return new AdminException(error.message, 'ERROR', undefined, error);
  }

  return new AdminException(
    'Ocurrió un error inesperado. Por favor, revisa tu conexión e inténtalo de nuevo.',
    'UNKNOWN_ERROR',
    undefined,
    error
  );
};

export class ProgramManagementException extends AdminException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'PROGRAM_MANAGEMENT_ERROR', statusCode, originalError);
    this.name = 'ProgramManagementException';
    Object.setPrototypeOf(this, ProgramManagementException.prototype);
  }
}

export class ActivityManagementException extends AdminException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ACTIVITY_MANAGEMENT_ERROR', statusCode, originalError);
    this.name = 'ActivityManagementException';
    Object.setPrototypeOf(this, ActivityManagementException.prototype);
  }
}

export class RoleRequestReviewException extends AdminException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ROLE_REQUEST_REVIEW_ERROR', statusCode, originalError);
    this.name = 'RoleRequestReviewException';
    Object.setPrototypeOf(this, RoleRequestReviewException.prototype);
  }
}

export class CollaboratorManagementException extends AdminException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'COLLABORATOR_MANAGEMENT_ERROR', statusCode, originalError);
    this.name = 'CollaboratorManagementException';
    Object.setPrototypeOf(this, CollaboratorManagementException.prototype);
  }
}

export class AnalyticsException extends AdminException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ANALYTICS_ERROR', statusCode, originalError);
    this.name = 'AnalyticsException';
    Object.setPrototypeOf(this, AnalyticsException.prototype);
  }
}
