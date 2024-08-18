"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      {theme === 'light' ? (
        <button
          onClick={() => setTheme('dark')}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 ease-in-out shadow-md ring-2 ring-gray-400 ring-opacity-50"
          aria-label="Switch to dark mode"
        >
          <MdWbSunny className="text-2xl" />
        </button>
      ) : (
        <button
          onClick={() => setTheme('light')}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors duration-300 ease-in-out shadow-md ring-2 ring-gray-600 ring-opacity-50"
          aria-label="Switch to light mode"
        >
          <FaMoon className="text-2xl" />
        </button>
      )}
    </div>
  );
}
