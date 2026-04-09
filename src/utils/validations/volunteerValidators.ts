import { validators } from './validators';

/**
 * Validación para actualización de perfil de voluntario
 */
export const validateVolunteerProfile = (profile: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar firstName
  if (profile.firstName !== undefined && profile.firstName !== '') {
    const firstName = profile.firstName as string;
    if (firstName.trim().length === 0) {
      errors.firstName = 'El nombre es requerido';
    } else if (firstName.length > 100) {
      errors.firstName = 'El nombre no puede exceder 100 caracteres';
    }
  }

  // Validar lastName
  if (profile.lastName !== undefined && profile.lastName !== '') {
    const lastName = profile.lastName as string;
    if (lastName.trim().length === 0) {
      errors.lastName = 'El apellido es requerido';
    } else if (lastName.length > 100) {
      errors.lastName = 'El apellido no puede exceder 100 caracteres';
    }
  }

  // Validar phone
  if (profile.phone !== undefined && profile.phone !== '') {
    if (!validators.phone(profile.phone)) {
      errors.phone = 'Teléfono inválido. Debe contener al menos 7 dígitos';
    }
  }

  // Validar housingLocation
  if (profile.housingLocation !== undefined && profile.housingLocation !== '') {
    const location = profile.housingLocation as string;
    if (location.length > 200) {
      errors.housingLocation = 'La ubicación no puede exceder 200 caracteres';
    }
  }

  // Validar personalGoalHours
  if (profile.personalGoalHours !== undefined) {
    const hours = profile.personalGoalHours as number;
    if (isNaN(hours) || hours < 0) {
      errors.personalGoalHours = 'Las horas objetivas deben ser un número positivo';
    } else if (hours > 10000) {
      errors.personalGoalHours = 'Las horas objetivas no pueden exceder 10000';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validación para solicitud de inscripción en actividad
 */
export const validateEnrollmentRequest = (enrollment: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar activityId
  if (!enrollment.activityId) {
    errors.activityId = 'Se requiere seleccionar una actividad';
  } else if (typeof enrollment.activityId !== 'number' || enrollment.activityId <= 0) {
    errors.activityId = 'El ID de la actividad no es válido';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validación para solicitud de rol coordinador
 */
export const validateRoleRequest = (request: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar reason
  if (!request.reason) {
    errors.reason = 'Debes proporcionar un motivo para la solicitud';
  } else if (typeof request.reason === 'string') {
    if (request.reason.trim().length === 0) {
      errors.reason = 'El motivo no puede estar vacío';
    } else if (request.reason.length < 10) {
      errors.reason = 'El motivo debe tener al menos 10 caracteres';
    } else if (request.reason.length > 1000) {
      errors.reason = 'El motivo no puede exceder 1000 caracteres';
    }
  }

  // Validar months
  if (request.months !== undefined) {
    const months = request.months as number;
    if (isNaN(months) || months < 1 || months > 36) {
      errors.months = 'La duración debe estar entre 1 y 36 meses';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validación para cancelación de inscripción
 */
export const validateCancelEnrollment = (enrollmentId: unknown) => {
  if (!enrollmentId || typeof enrollmentId !== 'number' || enrollmentId <= 0) {
    return 'ID de inscripción inválido';
  }
  return null;
};
