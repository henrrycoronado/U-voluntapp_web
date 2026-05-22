import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { Button, Card, StatusBadge } from '../../../shared/components';
import apiClient from '../../../shared/services/client';
import { useAuthStore } from '../../../app/store/authStore';
import { CreateActivityModal } from '../../actividades/views/CreateActivityModal';

export const ProgramList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuthStore();
  const [programs, setPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPrograms = async () => {
    try {
      const response = await apiClient.get('/api/v1/programs');
      setPrograms(response.data.data || response.data);
    } catch (error) {
      console.error('Error al cargar programas reales:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsModalOpen(params.get('crear') === 'true');
  }, [location.search]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/programas', { replace: true });
    fetchPrograms();
  };

  return (
    <div className="p-4 md:p-10 w-full max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Explorar Oportunidades</h1>
        {(role === 'Coordinator' || role === 'SuperUser' || role === 'Admin') && (
          <Button variant="primary" className="!w-auto px-4" onClick={() => navigate('/programas?crear=true')}>
            <Plus size={18} className="mr-1" /> Nuevo
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="relative w-full md:w-[320px]">
          <Search className="absolute left-3 top-3 text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder="Buscar programas reales..." 
            className="w-full bg-[#18181b] border border-zinc-800/80 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-500 text-sm text-white placeholder-zinc-500"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-zinc-500 text-center py-10">Cargando base de datos...</div>
      ) : programs.length === 0 ? (
        <div className="text-zinc-500 text-center py-10 border border-dashed border-zinc-800 rounded-xl">
          No hay programas creados aún. ¡Crea el primero!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog: any) => (
            <Card key={prog.id} className="flex flex-col h-full p-6 hover:border-yellow-500/30 transition-colors cursor-pointer" onClick={() => navigate(`/programas/${prog.id}`)}>
              <StatusBadge text={prog.state || 'ACTIVO'} type="default" />
              <h2 className="text-lg font-bold mt-4 mb-2">{prog.name}</h2>
              <p className="text-sm text-zinc-400 mb-6 flex-grow leading-relaxed line-clamp-3">
                {prog.description || 'Sin descripción.'}
              </p>
              <Button variant="outline" onClick={(e: any) => { e.stopPropagation(); navigate(`/programas/${prog.id}`); }}>
                Ver Detalles
              </Button>
            </Card>
          ))}
        </div>
      )}

      <CreateActivityModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
