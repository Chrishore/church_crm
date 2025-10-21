'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="fixed bottom-5 right-5 md:bottom-5 md:right-5 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 text-white text-2xl"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
