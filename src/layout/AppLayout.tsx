import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useThemeStore } from '../store/themeStore';

export default function AppLayout() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
