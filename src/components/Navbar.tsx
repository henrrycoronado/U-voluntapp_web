import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../utils/store/authStore';
import { useThemeStore } from '../utils/store/themeStore';
import { LogOut, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">U-Voluntapp</h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-300">
          {user?.firstName} {user?.lastName}
        </span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-gray-600" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
