import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RoleGuard } from '../guards';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../atoms/Button';
import {
  LayoutDashboard,
  CalendarDays,
  Activity,
  History,
  PieChart,
  User,
  Settings,
  LogOut,
  UserPlus,
} from 'lucide-react';
import Logo from '../../assets/Logo.svg';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const mainMenuItems = [
    { label: 'Dashboard', path: '/dashboard', roles: [], icon: LayoutDashboard },
    { label: 'Programas', path: '/programs', roles: [], icon: CalendarDays },
    { label: 'Actividades', path: '/activities', roles: [], icon: Activity },
    {
      label: 'Historial',
      path: '/tracking',
      roles: ['Admin', 'SuperUser', 'Coordinator', 'Volunteer'],
      icon: History,
    },
    {
      label: 'Solicitudes',
      path: '/requests',
      roles: ['Admin', 'SuperUser', 'Coordinator', 'Volunteer'],
      icon: UserPlus,
    },
    { label: 'Reportes', path: '/reports', roles: ['Admin', 'SuperUser'], icon: PieChart },
  ];

  const bottomMenuItems = [
    { label: 'Perfil', path: '/profile', roles: [], icon: User },
    { label: 'Configuración', path: '/settings', roles: [], icon: Settings },
  ];

  const renderLinks = (items: typeof mainMenuItems) =>
    items.map((item) => {
      const isActive = location.pathname.startsWith(item.path);
      const Icon = item.icon;
      const link = (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-yellow-500/10 text-yellow-400 font-medium' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
        >
          <Icon className="w-5 h-5" />
          {item.label}
        </Link>
      );
      if (item.roles.length > 0) {
        return (
          <RoleGuard key={item.path} requiredRoles={item.roles as string[]}>
            {link}
          </RoleGuard>
        );
      }
      return link;
    });

  return (
    <aside className="w-64 bg-zinc-950 border-r border-white/5 flex flex-col h-full">
      <div className="p-6 flex items-center justify-center">
        <img src={Logo} alt="U-VoluntApp Logo" className="h-12 w-auto" />
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">{renderLinks(mainMenuItems)}</nav>

      <div className="p-4 border-t border-white/5">
        <div className="mb-4 px-2">
          <p className="text-sm font-medium text-white">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-zinc-500">{user?.roles?.join(', ')}</p>
        </div>
        <nav className="space-y-1 mb-4">{renderLinks(bottomMenuItems)}</nav>
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full flex items-center gap-3 justify-start px-4 py-3 text-white bg-red-600/90 hover:bg-red-500 border border-red-500/50 rounded-xl transition-colors duration-200 shadow-lg shadow-red-900/20"
        >
          <LogOut className="w-5 h-5" />
          Salir
        </Button>
      </div>
    </aside>
  );
};
