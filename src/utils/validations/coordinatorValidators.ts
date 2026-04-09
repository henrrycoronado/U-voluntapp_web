/**
 * Validación para creación/actualización de programas
 */
export const validateProgram = (program: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar name
  if (!program.name) {
    errors.name = 'El nombre del programa es requerido';
  } else if (typeof program.name === 'string') {
    const name = program.name.trim();
    if (name.length === 0) {
      errors.name = 'El nombre del programa no puede estar vacío';
    } else if (name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (name.length > 200) {
      errors.name = 'El nombre no puede exceder 200 caracteres';
    }
  }

  // Validar description
  if (program.description !== undefined && program.description !== '') {
    const description = program.description as string;
    if (description.length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres';
    } else if (description.length > 2000) {
      errors.description = 'La descripción no puede exceder 2000 caracteres';
    }
  }

  // Validar acronym
  if (program.acronym !== undefined && program.acronym !== '') {
    const acronym = program.acronym as string;
    if (acronym.length < 2 || acronym.length > 10) {
      errors.acronym = 'El acrónimo debe tener entre 2 y 10 caracteres';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validación para creación/actualización de actividades
 */
export const validateActivity = (activity: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar programId
  if (!activity.programId || typeof activity.programId !== 'number' || activity.programId <= 0) {
    errors.programId = 'Se debe seleccionar un programa válido';
  }

  // Validar name
  if (!activity.name) {
    errors.name = 'El nombre de la actividad es requerido';
  } else if (typeof activity.name === 'string') {
    const name = activity.name.trim();
    if (name.length === 0) {
      errors.name = 'El nombre no puede estar vacío';
    } else if (name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (name.length > 200) {
      errors.name = 'El nombre no puede exceder 200 caracteres';
    }
  }

  // Validar description
  if (activity.description !== undefined && activity.description !== '') {
    const description = activity.description as string;
    if (description.length > 2000) {
      errors.description = 'La descripción no puede exceder 2000 caracteres';
    }
  }

  // Validar startDate
  if (activity.startDate !== undefined) {
    const startDate = new Date(activity.startDate as string);
    if (isNaN(startDate.getTime())) {
      errors.startDate = 'Fecha de inicio inválida';
    } else if (startDate < new Date()) {
      errors.startDate = 'La fecha de inicio debe ser en el futuro';
    }
  }

  // Validar endDate
  if (activity.endDate !== undefined) {
    const endDate = new Date(activity.endDate as string);
    if (isNaN(endDate.getTime())) {
      errors.endDate = 'Fecha de fin inválida';
    } else if (activity.startDate && endDate <= new Date(activity.startDate as string)) {
      errors.endDate = 'La fecha de fin debe ser posterior a la de inicio';
    }
  }

  // Validar capacity
  if (activity.capacity !== undefined) {
    const capacity = activity.capacity as number;
    if (!Number.isInteger(capacity) || capacity < 1) {
      errors.capacity = 'La capacidad debe ser un número entero positivo';
    } else if (capacity > 10000) {
      errors.capacity = 'La capacidad no puede exceder 10000';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validación para solicitud de rol admin
 */
export const validateAdminRequest = (request: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar reason
  if (!request.reason) {
    errors.reason = 'Debes proporcionar un motivo para la solicitud';
  } else if (typeof request.reason === 'string') {
    if (request.reason.trim().length === 0) {
      errors.reason = 'El motivo no puede estar vacío';
    } else if (request.reason.length < 10) {
      errors.reason = 'El motivo debe tener al menos 10 caracteres';
    } else if (request.reason.length > 1500) {
      errors.reason = 'El motivo no puede exceder 1500 caracteres';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validación para revisión de inscripciones
 */
export const validateEnrollmentReview = (review: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar enrollmentId
  if (!review.enrollmentId || typeof review.enrollmentId !== 'number' || review.enrollmentId <= 0) {
    errors.enrollmentId = 'ID de inscripción inválido';
  }

  // Validar approved (booleano)
  if (review.approved === undefined || typeof review.approved !== 'boolean') {
    errors.approved = 'Debes indicar si apruebas o rechazas la inscripción';
  }

  // Si rechaza, validar reason
  if (review.approved === false && !review.reason) {
    errors.reason = 'Debes proporcionar un motivo para rechazar';
  } else if (review.reason !== undefined) {
    const reason = review.reason as string;
    if (reason && reason.length < 5) {
      errors.reason = 'El motivo debe tener al menos 5 caracteres';
    } else if (reason && reason.length > 500) {
      errors.reason = 'El motivo no puede exceder 500 caracteres';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validación para agregar colaborador al programa
 */
export const validateAddCollaborator = (collaborator: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  // Validar programId
  if (
    !collaborator.programId ||
    typeof collaborator.programId !== 'number' ||
    collaborator.programId <= 0
  ) {
    errors.programId = 'ID de programa inválido';
  }

  // Validar profileId
  if (!collaborator.profileId) {
    errors.profileId = 'Se debe seleccionar un perfil';
  }

  // Validar accessLevel (1-3)
  if (collaborator.accessLevel !== undefined) {
    const level = collaborator.accessLevel as number;
    if (!Number.isInteger(level) || level < 1 || level > 3) {
      errors.accessLevel = 'El nivel de acceso debe estar entre 1 (Manager) y 3 (Viewer)';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
