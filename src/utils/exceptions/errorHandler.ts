import type { AxiosError } from 'axios';

type ErrorPayload = {
  success?: boolean;
  message?: string;
  Message?: string;
  title?: string;
  detail?: string;
  error?: string;
  errors?: string[] | Record<string, string[] | string>;
};

const getStatusFallbackMessage = (status?: number): string => {
  switch (status) {
    case 400:
      return 'La solicitud es inválida. Revisa los datos enviados.';
    case 401:
      return 'No autenticado. Por favor, inicia sesión nuevamente.';
    case 403:
      return 'No tienes permisos para realizar esta acción.';
    case 404:
      return 'No se encontró el recurso solicitado.';
    case 409:
      return 'No se pudo completar la acción por un conflicto de datos.';
    case 422:
      return 'No se pudo procesar la solicitud. Revisa la información.';
    case 500:
      return 'Error interno del servidor. Intenta nuevamente más tarde.';
    default:
      return 'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.';
  }
};

const flattenErrors = (errors: NonNullable<ErrorPayload['errors']>): string | undefined => {
  if (Array.isArray(errors)) {
    return errors.find((item) => typeof item === 'string' && item.trim().length > 0);
  }

  const values = Object.values(errors)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .map((value) => String(value).trim())
    .filter((value) => value.length > 0);

  return values.length > 0 ? values[0] : undefined;
};

export const extractErrorMessage = (payload: unknown): string | undefined => {
  if (!payload) return undefined;

  if (typeof payload === 'string') {
    return payload.trim().length > 0 ? payload : undefined;
  }

  if (Array.isArray(payload)) {
    const first = payload.find((item) => typeof item === 'string' && item.trim().length > 0);
    return typeof first === 'string' ? first : undefined;
  }

  if (typeof payload !== 'object') {
    return undefined;
  }

  const data = payload as ErrorPayload;

  if (typeof data.message === 'string' && data.message.trim().length > 0) return data.message;
  if (typeof data.Message === 'string' && data.Message.trim().length > 0) return data.Message;
  if (typeof data.detail === 'string' && data.detail.trim().length > 0) return data.detail;
  if (typeof data.title === 'string' && data.title.trim().length > 0) return data.title;
  if (typeof data.error === 'string' && data.error.trim().length > 0) return data.error;

  if (data.errors) {
    const flattened = flattenErrors(data.errors);
    if (flattened) return flattened;
  }

  return undefined;
};

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<unknown>;
    const status = axiosError.response?.status;

    const extracted = extractErrorMessage(axiosError.response?.data);
    if (extracted) return extracted;

    return getStatusFallbackMessage(status);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrió un error inesperado. Por favor, revisa tu conexión e inténtalo de nuevo.';
};
