import { Link } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';
import { List, User } from 'lucide-react';

export default function Sidebar() {
  const { hasAnyRole } = useAuthStore();

  return (
    <aside className="w-64 bg-brand-blue dark:bg-gray-900 text-white h-screen flex flex-col transition-colors">
      <div className="p-6 border-b border-brand-blue/30 dark:border-gray-700">
        <h1 className="text-2xl font-bold">U-Voluntapp</h1>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {/* Dominio: Programas */}
        {hasAnyRole(['Volunteer', 'Coordinator', 'Admin']) && (
          <Link
            to="/programas"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-brand-blue/80 dark:hover:bg-gray-800 transition"
          >
            <List size={20} />
            Programas
          </Link>
        )}

        {/* Dominio: Miembros (Perfil) */}
        {hasAnyRole(['Volunteer', 'Coordinator', 'Admin']) && (
          <Link
            to="/perfil"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-brand-blue/80 dark:hover:bg-gray-800 transition"
          >
            <User size={20} />
            Mi Perfil
          </Link>
        )}

        {/* Aquí en el futuro Henrry agregará los botones para /actividades o /reportes si son necesarios */}
      </nav>
    </aside>
  );
}
