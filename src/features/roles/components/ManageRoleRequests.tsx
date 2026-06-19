import React, { useEffect, useState } from 'react';
import { Card } from '../../../core/components/atoms/Card';
import { Button } from '../../../core/components/atoms/Button';
import { useToastStore } from '../../../core/store/toastStore';
import { roleService } from '../services/roleService';
import { programService } from '../../programs/services/programService';
import { collaboratorService } from '../../collaborators/services/collaboratorService';
import type { RoleRequestResponseDto } from '../types';
import type { ProgramDto } from '../../programs/types';
import type { CollaboratorDto } from '../../collaborators/types';
import { Check, X, ShieldAlert, Users } from 'lucide-react';

interface ManageRoleRequestsProps {
  isAdmin: boolean;
  isSuperUser: boolean;
}

export const ManageRoleRequests: React.FC<ManageRoleRequestsProps> = ({ isAdmin, isSuperUser }) => {
  const { addToast } = useToastStore();
  const [coordinatorRequests, setCoordinatorRequests] = useState<RoleRequestResponseDto[]>([]);
  const [adminRequests, setAdminRequests] = useState<RoleRequestResponseDto[]>([]);

  // Program collaborator management
  const [programs, setPrograms] = useState<ProgramDto[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [programRequests, setProgramRequests] = useState<CollaboratorDto[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchRoleRequests = async () => {
    try {
      setLoading(true);
      if (isAdmin || isSuperUser) {
        const coordReqs = await roleService.getCoordinatorRequests();
        setCoordinatorRequests(coordReqs);
      }
      if (isSuperUser) {
        const admReqs = await roleService.getAdminRequests();
        setAdminRequests(admReqs);
      }
      const allProgs = await programService.getAll();
      setPrograms(allProgs);
    } catch {
      addToast('error', 'Error al cargar las solicitudes de rol');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, isSuperUser]);

  useEffect(() => {
    const fetchProgramRequests = async () => {
      if (!selectedProgram) {
        setProgramRequests([]);
        return;
      }
      try {
        // stage-1 typically means "Pending" for collaborators
        const requests = await collaboratorService.getByProgram(selectedProgram, 'stage-1');
        setProgramRequests(requests);
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const err = error as { response?: { status?: number } };
          if (err.response?.status === 403) {
            addToast('error', 'No tienes permisos para gestionar este programa');
            setProgramRequests([]);
            return;
          }
        }
        addToast('error', 'Error al cargar solicitudes del programa');
      }
    };
    fetchProgramRequests();
  }, [selectedProgram, addToast]);

  const handleApproveRole = async (type: 'coordinator' | 'admin', uvaCode: string) => {
    try {
      if (type === 'coordinator') await roleService.approveCoordinator(uvaCode);
      else await roleService.approveAdmin(uvaCode);
      addToast('success', `Solicitud a ${type} aprobada`);
      fetchRoleRequests();
    } catch {
      addToast('error', 'Error al aprobar la solicitud');
    }
  };

  const handleRejectRole = async (type: 'coordinator' | 'admin', uvaCode: string) => {
    try {
      if (type === 'coordinator') await roleService.rejectCoordinator(uvaCode);
      else await roleService.rejectAdmin(uvaCode);
      addToast('success', `Solicitud a ${type} rechazada`);
      fetchRoleRequests();
    } catch {
      addToast('error', 'Error al rechazar la solicitud');
    }
  };

  const handleUpdateCollaborator = async (uvaCode: string, stateCode: string) => {
    try {
      // stage-2 = Approved, stage-3 = Rejected (or deleted)
      await collaboratorService.update(uvaCode, { stateCode });
      addToast('success', 'Solicitud de programa actualizada');
      // refresh list
      const requests = await collaboratorService.getByProgram(selectedProgram, 'stage-1');
      setProgramRequests(requests);
    } catch {
      addToast('error', 'Error al actualizar solicitud del programa');
    }
  };

  if (loading) return <div className="text-zinc-500">Cargando solicitudes...</div>;

  return (
    <div className="space-y-8">
      {/* Admin Requests (Only SU) */}
      {isSuperUser && (
        <Card className="p-6 border-red-500/20">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-white">Solicitudes para Administrador</h2>
          </div>
          {adminRequests.length === 0 ? (
            <p className="text-sm text-zinc-500">No hay solicitudes pendientes.</p>
          ) : (
            <div className="space-y-4">
              {adminRequests.map((req) => (
                <div
                  key={req.uvaCode}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 p-4 rounded-xl border border-white/5 gap-4"
                >
                  <div>
                    <p className="text-white font-medium">Usuario: {req.requesterProfileCode}</p>
                    <p className="text-sm text-zinc-400">Justificación: {req.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleRejectRole('admin', req.requesterProfileCode || '')}
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleApproveRole('admin', req.requesterProfileCode || '')}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Coordinator Requests (Admin and SU) */}
      {(isAdmin || isSuperUser) && (
        <Card className="p-6 border-yellow-500/20">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-white">Solicitudes para Coordinador</h2>
          </div>
          {coordinatorRequests.length === 0 ? (
            <p className="text-sm text-zinc-500">No hay solicitudes pendientes.</p>
          ) : (
            <div className="space-y-4">
              {coordinatorRequests.map((req) => (
                <div
                  key={req.uvaCode}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 p-4 rounded-xl border border-white/5 gap-4"
                >
                  <div>
                    <p className="text-white font-medium">Usuario: {req.requesterProfileCode}</p>
                    <p className="text-sm text-zinc-400">Justificación: {req.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleRejectRole('coordinator', req.requesterProfileCode || '')
                      }
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleApproveRole('coordinator', req.requesterProfileCode || '')
                      }
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Program Collaborator Requests */}
      <Card className="p-6 border-blue-500/20">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-white">Solicitudes a Programas</h2>
          </div>
          <select
            className="bg-zinc-900 border border-white/10 rounded-xl p-2 text-sm text-white focus:outline-none focus:border-yellow-500"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="">Selecciona un programa para gestionar</option>
            {programs.map((p) => (
              <option key={p.uvaCode} value={p.uvaCode}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {!selectedProgram ? (
          <p className="text-sm text-zinc-500">
            Selecciona un programa para ver sus solicitudes pendientes.
          </p>
        ) : programRequests.length === 0 ? (
          <p className="text-sm text-zinc-500">No hay solicitudes pendientes en este programa.</p>
        ) : (
          <div className="space-y-4">
            {programRequests.map((req) => (
              <div
                key={req.uvaCode}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 p-4 rounded-xl border border-white/5 gap-4"
              >
                <div>
                  <p className="text-white font-medium">{req.profileName}</p>
                  <p className="text-xs text-zinc-500">
                    Solicitado el: {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateCollaborator(req.uvaCode, 'stage-4')}
                    className="text-red-400 hover:bg-red-500/10"
                    title="Rechazar"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateCollaborator(req.uvaCode, 'stage-2')}
                    title="Aprobar (Activo)"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
