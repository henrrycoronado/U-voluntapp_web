/**
 * Validation for program creation and updates.
 */
export const validateProgram = (program: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (!program.name) {
    errors.name = 'Program name is required';
  } else if (typeof program.name === 'string') {
    const name = program.name.trim();
    if (name.length === 0) {
      errors.name = 'Program name cannot be empty';
    } else if (name.length < 3) {
      errors.name = 'The name must have at least 3 characters';
    } else if (name.length > 200) {
      errors.name = 'The name cannot exceed 200 characters';
    }
  }

  if (program.description !== undefined && program.description !== '') {
    const description = program.description as string;
    if (description.length < 10) {
      errors.description = 'The description must have at least 10 characters';
    } else if (description.length > 2000) {
      errors.description = 'The description cannot exceed 2000 characters';
    }
  }

  if (program.acronym !== undefined && program.acronym !== '') {
    const acronym = program.acronym as string;
    if (acronym.length < 2 || acronym.length > 10) {
      errors.acronym = 'The acronym must be between 2 and 10 characters';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validation for activity creation and updates.
 */
export const validateActivity = (activity: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (!activity.programId || typeof activity.programId !== 'number' || activity.programId <= 0) {
    errors.programId = 'You must select a valid program';
  }

  if (!activity.name) {
    errors.name = 'Activity name is required';
  } else if (typeof activity.name === 'string') {
    const name = activity.name.trim();
    if (name.length === 0) {
      errors.name = 'Activity name cannot be empty';
    } else if (name.length < 3) {
      errors.name = 'The name must have at least 3 characters';
    } else if (name.length > 200) {
      errors.name = 'The name cannot exceed 200 characters';
    }
  }

  if (activity.description !== undefined && activity.description !== '') {
    const description = activity.description as string;
    if (description.length > 2000) {
      errors.description = 'The description cannot exceed 2000 characters';
    }
  }

  if (activity.startDate !== undefined) {
    const startDate = new Date(activity.startDate as string);
    if (isNaN(startDate.getTime())) {
      errors.startDate = 'Invalid start date';
    } else if (startDate < new Date()) {
      errors.startDate = 'The start date must be in the future';
    }
  }

  if (activity.endDate !== undefined) {
    const endDate = new Date(activity.endDate as string);
    if (isNaN(endDate.getTime())) {
      errors.endDate = 'Invalid end date';
    } else if (activity.startDate && endDate <= new Date(activity.startDate as string)) {
      errors.endDate = 'The end date must be after the start date';
    }
  }

  if (activity.capacity !== undefined) {
    const capacity = activity.capacity as number;
    if (!Number.isInteger(capacity) || capacity < 1) {
      errors.capacity = 'Capacity must be a positive integer';
    } else if (capacity > 10000) {
      errors.capacity = 'Capacity cannot exceed 10000';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validation for admin role requests.
 */
export const validateAdminRequest = (request: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (!request.reason) {
    errors.reason = 'You must provide a reason for the request';
  } else if (typeof request.reason === 'string') {
    if (request.reason.trim().length === 0) {
      errors.reason = 'The reason cannot be empty';
    } else if (request.reason.length < 10) {
      errors.reason = 'The reason must have at least 10 characters';
    } else if (request.reason.length > 1500) {
      errors.reason = 'The reason cannot exceed 1500 characters';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validation for enrollment reviews.
 */
export const validateEnrollmentReview = (review: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (!review.enrollmentId || typeof review.enrollmentId !== 'number' || review.enrollmentId <= 0) {
    errors.enrollmentId = 'Invalid enrollment ID';
  }

  if (review.approved === undefined || typeof review.approved !== 'boolean') {
    errors.approved = 'You must indicate whether you approve or reject the enrollment';
  }

  if (review.approved === false && !review.reason) {
    errors.reason = 'You must provide a reason for rejection';
  } else if (review.reason !== undefined) {
    const reason = review.reason as string;
    if (reason && reason.length < 5) {
      errors.reason = 'The reason must have at least 5 characters';
    } else if (reason && reason.length > 500) {
      errors.reason = 'The reason cannot exceed 500 characters';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validation for adding a collaborator to a program.
 */
export const validateAddCollaborator = (collaborator: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (
    !collaborator.programId ||
    typeof collaborator.programId !== 'number' ||
    collaborator.programId <= 0
  ) {
    errors.programId = 'Invalid program ID';
  }

  if (!collaborator.profileId) {
    errors.profileId = 'You must select a profile';
  }

  if (collaborator.accessLevel !== undefined) {
    const level = collaborator.accessLevel as number;
    if (!Number.isInteger(level) || level < 1 || level > 3) {
      errors.accessLevel = 'Access level must be between 1 (Manager) and 3 (Viewer)';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
