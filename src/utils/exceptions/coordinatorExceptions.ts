import { AxiosError } from 'axios';

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
    const axiosError = error as AxiosError<{
      message?: string;
      Message?: string;
      errors?: string[] | Record<string, string[]>;
      code?: string;
    }>;

    const statusCode = axiosError.response?.status;
    const data = axiosError.response?.data;

    let message = 'Ocurrió un error inesperado';
    let code = 'AXIOS_ERROR';

    switch (statusCode) {
      case 400:
        code = 'VALIDATION_ERROR';
        if (data?.message) message = data.message;
        else if (data?.Message) message = data.Message;
        else if (data?.errors) {
          if (Array.isArray(data.errors)) {
            message = data.errors[0];
          } else {
            const firstError = Object.values(data.errors)[0];
            message = Array.isArray(firstError) ? firstError[0] : String(firstError);
          }
        }
        break;

      case 401:
        code = 'UNAUTHORIZED';
        message = 'No autenticado. Por favor, inicia sesión nuevamente';
        break;

      case 403:
        code = 'FORBIDDEN';
        message = 'No tienes permiso para realizar esta acción';
        break;

      case 404:
        code = 'NOT_FOUND';
        message = 'El recurso solicitado no fue encontrado';
        break;

      case 409:
        code = 'CONFLICT';
        if (data?.message) message = data.message;
        else message = 'Conflicto en la operación. Intenta nuevamente';
        break;

      case 500:
        code = 'SERVER_ERROR';
        message = 'Error del servidor. Por favor, intenta más tarde';
        break;

      default:
        message = axiosError.message || 'Error en la solicitud';
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
