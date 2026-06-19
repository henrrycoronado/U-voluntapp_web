import React, { useState } from 'react';
import { useAuthStore } from '../../../core/store/authStore';
import { Card } from '../../../core/components/atoms/Card';
import { Button } from '../../../core/components/atoms/Button';
import { RoleRequestForm } from '../components/RoleRequestForm';
import { ProgramJoinForm } from '../components/ProgramJoinForm';
import { ManageRoleRequests } from '../components/ManageRoleRequests';
import { Shield, UserPlus, ClipboardList } from 'lucide-react';

const RoleRequestsPage: React.FC = () => {
  const { user } = useAuthStore();
  const roles = user?.roles || [];

  const isVolunteer = roles.includes('Volunteer');
  const isCoordinator = roles.includes('Coordinator');
  const isAdmin = roles.includes('Admin');
  const isSuperUser = roles.includes('SuperUser');

  const [activeTab, setActiveTab] = useState<'my-requests' | 'manage'>('my-requests');

  const canManage = isAdmin || isSuperUser;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-white">Solicitudes de Cargo y Programas</h1>
      </div>

      {canManage && (
        <div className="flex gap-4 border-b border-white/10 pb-4">
          <Button
            variant={activeTab === 'my-requests' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('my-requests')}
          >
            Mis Solicitudes
          </Button>
          <Button
            variant={activeTab === 'manage' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('manage')}
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Gestionar Solicitudes
          </Button>
        </div>
      )}

      {activeTab === 'my-requests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Volunteer can request Coordinator */}
          {isVolunteer && !isCoordinator && !isAdmin && !isSuperUser && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-semibold text-white">Solicitar ser Coordinador</h2>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                Envía una justificación de por qué deseas asumir el rol de coordinador. Esta
                solicitud será revisada por un Administrador.
              </p>
              <RoleRequestForm targetRole="coordinator" />
            </Card>
          )}

          {/* Coordinator can request Admin */}
          {isCoordinator && !isAdmin && !isSuperUser && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-semibold text-white">Solicitar ser Administrador</h2>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                Envía una justificación para elevar tus permisos a Administrador. Requiere
                aprobación de SuperUser.
              </p>
              <RoleRequestForm targetRole="admin" />
            </Card>
          )}

          {/* Coordinator or Admin can request to join a program */}
          {(isCoordinator || isAdmin || isSuperUser) && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserPlus className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-semibold text-white">Unirse a un Programa</h2>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                Selecciona un programa para solicitar unirte como colaborador.
              </p>
              <ProgramJoinForm />
            </Card>
          )}
        </div>
      )}

      {activeTab === 'manage' && canManage && (
        <ManageRoleRequests isAdmin={isAdmin} isSuperUser={isSuperUser} />
      )}
    </div>
  );
};

export default RoleRequestsPage;
