import { profilesApi, type UpdateProfileRequest } from './profileApi';

export const volunteerApi = {
  updateMyProfile: async (data: UpdateProfileRequest) => {
    const response = await profilesApi.updateMe(data);
    return response.data.data;
  },

  deleteMyAccount: async () => {
    // Esta función probablemente no existe en profilesApi, es una operación especial
    // Por ahora la dejamos como stub o la implementamos cuando esté el endpoint
    throw new Error('Delete account endpoint not implemented yet');
  },
};
