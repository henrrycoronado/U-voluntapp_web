import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Users } from 'lucide-react';
import { Button, Card, StatusBadge, SkeletonList, Alert } from '../../../components';
import { useAuthStore } from '../../../app/store/authStore';
import { CreateProgramModal } from './CreateProgramModal';
import { usePrograms } from '../hooks/usePrograms';
import type { Program } from '../services/programsApi';

export const ProgramList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuthStore();
  const { data: programs, loading: isLoading, error, refresh } = usePrograms();

  const isModalOpen = new URLSearchParams(location.search).get('create') === 'true';

  const handleCloseModal = () => {
    navigate('/programs', { replace: true });
    refresh();
  };

  return (
    <div className="p-4 md:p-10 w-full max-w-7xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Programs</h1>
          <p className="text-zinc-400">Join a program and start your volunteering journey.</p>
        </div>
        {(role === 'Coordinator' || role === 'SuperUser' || role === 'Admin') && (
          <Button
            variant="primary"
            className="!w-auto px-6 py-3 h-fit"
            onClick={() => navigate('/programs?create=true')}
          >
            <Plus size={20} className="mr-2" /> Create New
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search programs by name or description..."
            className="w-full bg-[#121214] border border-zinc-800/80 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-yellow-500 transition-all text-sm text-white placeholder-zinc-500"
          />
        </div>
      </div>

      {error && (
        <Alert variant="error" className="mb-8">
          {error}
        </Alert>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonList count={6} />
        </div>
      ) : !programs || programs.length === 0 ? (
        <div className="text-zinc-500 text-center py-24 border-2 border-dashed border-zinc-900 rounded-3xl">
          <div className="max-w-xs mx-auto">
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={20} />
            </div>
            <h3 className="text-white font-bold mb-1">No programs found</h3>
            <p className="text-sm">
              We couldn't find any programs at the moment. Try creating one!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
          {programs.map((prog: Program) => (
            <Card
              key={prog.id}
              className="group flex flex-col h-full p-8 hover:border-yellow-500/30 transition-all cursor-pointer bg-[#121214]"
              onClick={() => navigate(`/programs/${prog.id}`)}
            >
              <div className="flex justify-between items-start mb-6">
                <StatusBadge text={prog.state || 'ACTIVE'} type="default" />
                <div className="text-zinc-600 group-hover:text-yellow-500 transition-colors">
                  <Plus size={20} />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors">
                {prog.name}
              </h2>
              <p className="text-sm text-zinc-400 mb-8 flex-grow leading-relaxed line-clamp-3">
                {prog.description || 'No description available for this program.'}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  <Users size={14} className="text-yellow-500" />
                  Open Program
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateProgramModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
