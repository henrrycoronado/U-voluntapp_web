import type { AxiosError } from 'axios';
import { getErrorMessage } from './errorHandler';

/**
 * Excepción personalizada para errores relacionados con el módulo de voluntario
 */
export class VolunteerException extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly originalError?: unknown;

  constructor(
    message: string,
    code: string = 'VOLUNTEER_ERROR',
    statusCode?: number,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'VolunteerException';
    this.code = code;
    this.statusCode = statusCode;
    this.originalError = originalError;

    // Mantener la cadena de prototipos correcta
    Object.setPrototypeOf(this, VolunteerException.prototype);
  }
}

/**
 * Manejo específico de errores para voluntario
 */
export const handleVolunteerError = (error: unknown): VolunteerException => {
  // Si ya es VolunteerException, retornarlo
  if (error instanceof VolunteerException) {
    return error;
  }

  // Si es error de Axios
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError;

    const statusCode = axiosError.response?.status;
    const message = getErrorMessage(error);
    let code = 'AXIOS_ERROR';

    // Manejar diferentes códigos de estado
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

    return new VolunteerException(message, code, statusCode, error);
  }

  // Si es Error estándar
  if (error instanceof Error) {
    return new VolunteerException(error.message, 'ERROR', undefined, error);
  }

  // Cualquier otro tipo de error
  return new VolunteerException(
    'Ocurrió un error inesperado. Por favor, revisa tu conexión e inténtalo de nuevo.',
    'UNKNOWN_ERROR',
    undefined,
    error
  );
};

/**
 * Excepciones específicas para operaciones de voluntario
 */
export class ProfileException extends VolunteerException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'PROFILE_ERROR', statusCode, originalError);
    this.name = 'ProfileException';
    Object.setPrototypeOf(this, ProfileException.prototype);
  }
}

export class EnrollmentException extends VolunteerException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ENROLLMENT_ERROR', statusCode, originalError);
    this.name = 'EnrollmentException';
    Object.setPrototypeOf(this, EnrollmentException.prototype);
  }
}

export class RoleRequestException extends VolunteerException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'ROLE_REQUEST_ERROR', statusCode, originalError);
    this.name = 'RoleRequestException';
    Object.setPrototypeOf(this, RoleRequestException.prototype);
  }
}

export class ProgramException extends VolunteerException {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, 'PROGRAM_ERROR', statusCode, originalError);
    this.name = 'ProgramException';
    Object.setPrototypeOf(this, ProgramException.prototype);
  }
}
