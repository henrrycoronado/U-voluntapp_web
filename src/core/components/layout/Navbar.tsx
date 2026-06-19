import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../atoms/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-zinc-950/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
      <div></div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-zinc-500">{user?.roles?.join(', ')}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-500 font-bold">
          {user?.firstName?.[0] || 'U'}
        </div>
        <Button variant="ghost" size="sm" onClick={logout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Salir</Button>
      </div>
    </header>
  );
};
