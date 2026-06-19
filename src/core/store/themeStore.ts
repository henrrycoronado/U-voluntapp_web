import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEMES } from '../utils/constants';
import { toggleDarkModeClass } from '../themes';

type ThemeType = (typeof THEMES)[keyof typeof THEMES];

interface ThemeState {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: THEMES.DARK,
      isDarkMode: true,
      setTheme: (theme: ThemeType) => {
        const isDark = theme === THEMES.DARK;
        toggleDarkModeClass(isDark);
        set({ theme, isDarkMode: isDark });
      },
      toggleTheme: () => {
        const { isDarkMode } = get();
        const newTheme = isDarkMode ? THEMES.LIGHT : THEMES.DARK;
        toggleDarkModeClass(!isDarkMode);
        set({ theme: newTheme, isDarkMode: !isDarkMode });
      },
    }),
    {
      name: 'theme-store',
      onRehydrateStorage: () => (state) => {
        if (state) {
          toggleDarkModeClass(state.isDarkMode);
        }
      },
    }
  )
);
