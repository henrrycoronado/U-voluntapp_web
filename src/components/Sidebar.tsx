import { useAuthStore } from '../store/authStore';
import { BarChart3, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  const { hasRole, hasAnyRole } = useAuthStore();

  return (
    <aside className="w-64 bg-brand-blue dark:bg-gray-900 text-white h-screen flex flex-col transition-colors">
      <div className="p-6 border-b border-brand-blue/30 dark:border-gray-700">
        <h1 className="text-2xl font-bold">U-Voluntapp</h1>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {hasAnyRole(['Volunteer', 'Coordinator', 'Admin']) && (
          <a
            href="/volunteer"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-brand-blue/80 dark:hover:bg-gray-800 transition"
          >
            <Users size={20} />
            Voluntario
          </a>
        )}

        {hasAnyRole(['Coordinator', 'Admin']) && (
          <a
            href="/coordinator"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-brand-blue/80 dark:hover:bg-gray-800 transition"
          >
            <BarChart3 size={20} />
            Coordinador
          </a>
        )}

        {hasRole('Admin') && (
          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-brand-blue/80 dark:hover:bg-gray-800 transition"
          >
            <Settings size={20} />
            Administrador
          </a>
        )}
      </nav>
    </aside>
  );
}
