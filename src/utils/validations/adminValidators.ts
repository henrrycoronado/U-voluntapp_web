export const validateProgramManagement = (p: Record<string, unknown>) => {
  const e: Record<string, string> = {};
  if (!p.name) e.name = 'Name required';
  if (!p.description) e.description = 'Description required';
  return Object.keys(e).length > 0 ? e : null;
};

export const validateProgramStateChange = (s: Record<string, unknown>) => {
  const e: Record<string, string> = {};
  if (!s.stateId) e.stateId = 'State required';
  return Object.keys(e).length > 0 ? e : null;
};

export const validateActivityManagement = (a: Record<string, unknown>) => {
  const e: Record<string, string> = {};
  if (!a.programId) e.programId = 'Program required';
  if (!a.name) e.name = 'Name required';
  return Object.keys(e).length > 0 ? e : null;
};

export const validateActivityStateChange = (s: Record<string, unknown>) => {
  const e: Record<string, string> = {};
  if (!s.stateId) e.stateId = 'State required';
  return Object.keys(e).length > 0 ? e : null;
};

export const validateRoleRequestReview = (r: Record<string, unknown>) => {
  const e: Record<string, string> = {};
  if (!r.requestId) e.requestId = 'RequestId required';
  if (r.approved === undefined) e.approved = 'Approval required';
  return Object.keys(e).length > 0 ? e : null;
};

export const validateCollaboratorManagement = (c: Record<string, unknown>) => {
  const e: Record<string, string> = {};
  if (!c.programId) e.programId = 'ProgramId required';
  if (!c.profileId) e.profileId = 'ProfileId required';
  return Object.keys(e).length > 0 ? e : null;
};
