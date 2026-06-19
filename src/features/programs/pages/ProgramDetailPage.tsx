import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgramByCode, useUpdateProgram } from '../hooks/useProgramHooks';
import { Button } from '../../../core/components/atoms/Button';
import { RoleGuard } from '../../../core/components/guards/RoleGuard';
import { Modal } from '../../../core/components/molecules/Modal';
import { ActivityForm } from '../../activities/components/ActivityForm';
import { getFullImageUrl } from '../../../core/utils/imageUtils';
import ProfileProgram from '../../../core/assets/ProfileProgram.svg';
import { CalendarDays, Edit, Plus, ArrowLeft, Save, X } from 'lucide-react';
import { useToastStore } from '../../../core/store/toastStore';

export const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: program, isLoading, error } = useProgramByCode(id || '');
  const { mutate: updateProgram, isPending: isUpdating } = useUpdateProgram();
  const { addToast } = useToastStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', description: '', acronym: '' });
  const [isActivityModalOpen, setActivityModalOpen] = useState(false);

  if (isLoading) return <div className="text-zinc-500 animate-pulse">Cargando detalles...</div>;
  if (error || !program)
    return <div className="text-red-400">Error al cargar el programa o no encontrado.</div>;

  const isDefaultImage =
    !program.coverPhotoUrl ||
    program.coverPhotoUrl.toLowerCase().includes('default') ||
    program.coverPhotoUrl.toLowerCase().includes('deault');
  const imageSrc = isDefaultImage ? ProfileProgram : getFullImageUrl(program.coverPhotoUrl);

  const startEditing = () => {
    setEditData({
      name: program.name,
      description: program.description || '',
      acronym: program.acronym || '',
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProgram(
      { uvaCode: program.uvaCode, data: editData },
      {
        onSuccess: () => {
          addToast('success', 'Programa actualizado exitosamente');
          setIsEditing(false);
        },
        onError: () => {
          addToast('error', 'Error al actualizar el programa');
        },
      }
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Button variant="ghost" className="mb-4" onClick={() => navigate('/programs')}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Programas
      </Button>

      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <img src={imageSrc} alt={program.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-sm rounded-full bg-yellow-500/90 text-zinc-950 font-bold shadow-lg">
              {program.stateCode}
            </span>
            {isEditing ? (
              <input
                type="text"
                className="px-3 py-1 bg-white/10 border border-yellow-500/50 rounded-md text-white text-sm font-bold uppercase w-32"
                value={editData.acronym}
                onChange={(e) => setEditData({ ...editData, acronym: e.target.value })}
                placeholder="ACRÓNIMO"
              />
            ) : (
              program.acronym && (
                <span className="px-3 py-1 text-sm rounded-full bg-white/10 text-white font-bold border border-white/20">
                  {program.acronym}
                </span>
              )
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              className="w-full max-w-2xl text-4xl md:text-5xl font-extrabold text-white bg-white/10 border border-yellow-500/50 rounded-lg p-2 mb-2"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
          ) : (
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{program.name}</h1>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">Acerca de este Programa</h2>
            {isEditing ? (
              <textarea
                className="w-full h-48 bg-black/50 border border-yellow-500/50 rounded-xl p-4 text-white resize-none"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="Escribe la descripción completa del programa aquí..."
              />
            ) : (
              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {program.description || 'No hay descripción disponible para este programa.'}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col gap-4">
            <Button
              variant="primary"
              className="w-full py-4 text-lg"
              onClick={() => navigate(`/programs/${id}/activities`)}
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              Ver Actividades
            </Button>

            <RoleGuard requiredRoles={['Admin', 'SuperUser']}>
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleSave}
                    isLoading={isUpdating}
                  >
                    <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                    onClick={() => setIsEditing(false)}
                    disabled={isUpdating}
                  >
                    <X className="w-4 h-4 mr-2" /> Cancelar
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full" onClick={startEditing}>
                  <Edit className="w-4 h-4 mr-2" /> Editar Programa
                </Button>
              )}
            </RoleGuard>

            <RoleGuard requiredRoles={['Admin', 'SuperUser']}>
              <Button
                variant="outline"
                className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                onClick={() => setActivityModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" /> Crear Actividad
              </Button>
            </RoleGuard>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isActivityModalOpen}
        onClose={() => setActivityModalOpen(false)}
        title="Nueva Actividad para el Programa"
      >
        <ActivityForm
          preSelectedProgram={program.uvaCode}
          onSuccess={() => setActivityModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProgramDetailPage;
