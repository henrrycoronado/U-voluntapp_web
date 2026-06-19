import React from 'react';
import { ProfileHeader } from '../components/ProfileHeader';
import { PersonalInfoForm } from '../components/PersonalInfoForm';
import { SecurityForm } from '../components/SecurityForm';
import { Card } from '../../../core/components/atoms/Card';

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Mi Perfil</h2>
      <ProfileHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="flex flex-col h-full">
          <h3 className="text-xl font-semibold text-white mb-2">Información Personal</h3>
          <p className="text-zinc-400 mb-6 text-sm">Actualiza tus datos y configura tu meta de horas.</p>
          <div className="flex-1">
            <PersonalInfoForm />
          </div>
        </Card>
        
        <Card className="flex flex-col h-full">
          <h3 className="text-xl font-semibold text-white mb-2">Seguridad</h3>
          <p className="text-zinc-400 mb-6 text-sm">Gestiona la seguridad de tu cuenta.</p>
          <div className="flex-1">
            <SecurityForm />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
