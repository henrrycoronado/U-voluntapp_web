import { AxiosError } from 'axios';

export class AdminException extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly originalError?: unknown;

  constructor(msg: string, code = 'ADMIN_ERROR', statusCode?: number, err?: unknown) {
    super(msg);
    this.name = 'AdminException';
    this.code = code;
    this.statusCode = statusCode;
    this.originalError = err;
    Object.setPrototypeOf(this, AdminException.prototype);
  }
}

export const handleAdminError = (error: unknown): AdminException => {
  if (error instanceof AdminException) return error;

  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosErr = error as AxiosError<Record<string, unknown>>;
    const status = axiosErr.response?.status;
    const data = axiosErr.response?.data;

    let msg = 'Unexpected error occurred';
    let code = 'AXIOS_ERROR';

    if (status === 400) code = 'VALIDATION_ERROR';
    else if (status === 401) {
      code = 'UNAUTHORIZED';
      msg = 'Not authenticated';
    } else if (status === 403) {
      code = 'FORBIDDEN';
      msg = 'No permission';
    } else if (status === 404) {
      code = 'NOT_FOUND';
      msg = 'Resource not found';
    } else if (status === 409) code = 'CONFLICT';
    else if (status === 500) {
      code = 'SERVER_ERROR';
      msg = 'Server error';
    }

    if (typeof data?.message === 'string' && status === 400) msg = data.message;

    return new AdminException(msg, code, status, error);
  }

  if (error instanceof Error) return new AdminException(error.message, 'ERROR', undefined, error);

  return new AdminException('Unexpected error', 'UNKNOWN_ERROR', undefined, error);
};

export class ProgramManagementException extends AdminException {
  constructor(msg: string, status?: number, err?: unknown) {
    super(msg, 'PROGRAM_MANAGEMENT_ERROR', status, err);
    this.name = 'ProgramManagementException';
    Object.setPrototypeOf(this, ProgramManagementException.prototype);
  }
}

export class ActivityManagementException extends AdminException {
  constructor(msg: string, status?: number, err?: unknown) {
    super(msg, 'ACTIVITY_MANAGEMENT_ERROR', status, err);
    this.name = 'ActivityManagementException';
    Object.setPrototypeOf(this, ActivityManagementException.prototype);
  }
}

export class RoleRequestReviewException extends AdminException {
  constructor(msg: string, status?: number, err?: unknown) {
    super(msg, 'ROLE_REQUEST_REVIEW_ERROR', status, err);
    this.name = 'RoleRequestReviewException';
    Object.setPrototypeOf(this, RoleRequestReviewException.prototype);
  }
}

export class CollaboratorManagementException extends AdminException {
  constructor(msg: string, status?: number, err?: unknown) {
    super(msg, 'COLLABORATOR_MANAGEMENT_ERROR', status, err);
    this.name = 'CollaboratorManagementException';
    Object.setPrototypeOf(this, CollaboratorManagementException.prototype);
  }
}

export class AnalyticsException extends AdminException {
  constructor(msg: string, status?: number, err?: unknown) {
    super(msg, 'ANALYTICS_ERROR', status, err);
    this.name = 'AnalyticsException';
    Object.setPrototypeOf(this, AnalyticsException.prototype);
  }
}
import { AxiosError } from 'axios';

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

export const handleAdminError = (error: unknown): AdminException => {
  if (error instanceof AdminException) {
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
import { AxiosError } from 'axios';

/**
 * Excepción personalizada para errores del módulo admin
 */
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

/**
 * Manejo específico de errores para admin
 */
export const handleAdminError = (error: unknown): AdminException => {
  if (error instanceof AdminException) {
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

/**
 * Excepciones específicas para operaciones de admin
 */
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
