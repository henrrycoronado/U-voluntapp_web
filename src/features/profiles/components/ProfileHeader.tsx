import React from 'react';
import { useMe, useUpdatePhoto } from '../hooks/useProfileHooks';
import { Skeleton } from '../../../core/components/atoms/Skeleton';
import { ImageUploader } from '../../../core/components/molecules/ImageUploader';

export const ProfileHeader: React.FC = () => {
  const { data: profile, isLoading } = useMe();
  const { mutate: updatePhoto } = useUpdatePhoto();

  if (isLoading) {
    return (
      <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const handlePhotoUpload = (file: File) => {
    updatePhoto(file);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-zinc-900 border border-white/5 rounded-2xl shadow-xl">
      <div className="shrink-0">
        <ImageUploader 
          currentImageUrl={profile.photoUrl} 
          onImageSelected={handlePhotoUpload} 
          maxSizeMB={2}
        />
      </div>
      
      <div className="flex-1 space-y-4 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white">{profile.firstName} {profile.lastName}</h2>
          <p className="text-zinc-400 font-medium">{profile.email}</p>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-bold rounded-full uppercase tracking-wider border border-yellow-500/20">
            {profile.roles?.join(', ') || 'Voluntario'}
          </span>
          <span className="px-3 py-1 bg-white/5 text-zinc-300 text-xs font-semibold rounded-full border border-white/10">
            {profile.phone || 'Sin teléfono'}
          </span>
        </div>
      </div>
    </div>
  );
};
