import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Outlet />
    </div>
  );
}
