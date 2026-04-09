import type { AxiosError } from 'axios';
import { getErrorMessage } from './errorHandler';

/**
 * Excepción personalizada para errores del módulo coordinador
 */
export class CoordinatorException extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly originalError?: unknown;

  constructor(
    message: string,
    code: string = 'COORDINATOR_ERROR',
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'CoordinatorException';
    this.code = code;
    this.statusCode = statusCode;
    this.originalError = originalError;

    Object.setPrototypeOf(this, CoordinatorException.prototype);
  }
}

/**
 * Manejo específico de errores para coordinador
 */
export const handleCoordinatorError = (error: unknown): CoordinatorException => {
  if (error instanceof CoordinatorException) {
    return error;
  }

  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;

    const statusCode = axiosError.response?.status;
    const message = getErrorMessage(error);
    let code = 'AXIOS_ERROR';

    switch (statusCode) {
      case 400:
        code = 'VALIDATION_ERROR';
        break;

      case 401:
        code = 'UNAUTHORIZED';
        break;

      case 403:
        code = 'FORBIDDEN';
        break;

      case 404:
        code = 'NOT_FOUND';
        break;

      case 409:
        code = 'CONFLICT';
        break;

      case 500:
        code = 'SERVER_ERROR';
        break;

      case 422:
        code = 'UNPROCESSABLE_ENTITY';
        break;
    }

    return new CoordinatorException(message, code, statusCode, error);
  }

  if (error instanceof Error) {
    return new CoordinatorException(error.message, 'ERROR', undefined, error);
  }

  return new CoordinatorException(
    'Ocurrió un error inesperado. Por favor, revisa tu conexión e inténtalo de nuevo.',
    'UNKNOWN_ERROR',
    undefined,
    error
  );
};

/**
 * Excepciones específicas para operaciones de coordinador
 */
export class ProgramException extends CoordinatorException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'PROGRAM_ERROR', statusCode, originalError);
    this.name = 'ProgramException';
    Object.setPrototypeOf(this, ProgramException.prototype);
  }
}

export class ActivityException extends CoordinatorException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ACTIVITY_ERROR', statusCode, originalError);
    this.name = 'ActivityException';
    Object.setPrototypeOf(this, ActivityException.prototype);
  }
}

export class CollaboratorException extends CoordinatorException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'COLLABORATOR_ERROR', statusCode, originalError);
    this.name = 'CollaboratorException';
    Object.setPrototypeOf(this, CollaboratorException.prototype);
  }
}

export class EnrollmentReviewException extends CoordinatorException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ENROLLMENT_REVIEW_ERROR', statusCode, originalError);
    this.name = 'EnrollmentReviewException';
    Object.setPrototypeOf(this, EnrollmentReviewException.prototype);
  }
}

export class AdminRoleRequestException extends CoordinatorException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ADMIN_ROLE_REQUEST_ERROR', statusCode, originalError);
    this.name = 'AdminRoleRequestException';
    Object.setPrototypeOf(this, AdminRoleRequestException.prototype);
  }
}
