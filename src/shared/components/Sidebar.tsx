import { LogOut, BookOpen, PlusCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, role } = useAuthStore(); 

  const isActive = (path: string) => location.pathname.includes(path);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-[#121214] border-r border-zinc-800/50 flex flex-col justify-between text-zinc-300 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-10 h-8 cursor-pointer" onClick={() => navigate('/programas')}>
          <div className="w-6 h-6 flex items-center justify-center bg-yellow-500 rounded-sm">
             <span className="text-black font-bold text-xs">U</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">U-Volunt<span className="text-yellow-500">App</span></span>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          <button 
            onClick={() => navigate('/programas')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium w-full text-left
              ${isActive('/programas') && !location.search.includes('crear=true') ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
          >
            <BookOpen size={18} /> Programas
          </button>

          {(role === 'Coordinator' || role === 'SuperUser' || role === 'Admin') && (
            <button 
              onClick={() => navigate('/programas?crear=true')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium w-full text-left
                ${location.search.includes('crear=true') ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500' : 'hover:bg-zinc-800/50 text-zinc-400'}`}
            >
              <PlusCircle size={18} /> Crear Programa
            </button>
          )}
        </nav>
      </div>

      <div className="p-6 border-t border-zinc-800/50">
        <div className="flex items-center gap-3 mb-6 cursor-pointer hover:bg-zinc-800/30 p-2 rounded-lg transition-all" onClick={() => navigate('/perfil')}>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500 font-bold text-sm uppercase">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-white truncate">{user?.firstName} {user?.lastName}</span>
            <span className="text-[10px] text-zinc-500 uppercase">{role || 'Voluntario'}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-zinc-500 hover:text-red-400 transition-colors w-full text-left px-2"
        >
          <LogOut size={16} /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
