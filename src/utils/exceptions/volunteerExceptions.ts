import { AxiosError } from 'axios';

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

    // Manejar diferentes códigos de estado
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
