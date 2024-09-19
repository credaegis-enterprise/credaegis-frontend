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

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleClick}
        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-300 ease-in-out ${
          theme === 'light'
            ? 'text-gray-800 hover:text-gray-600'
            : 'text-gray-200 hover:text-gray-400'
        }`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <MdWbSunny 
            size={24} 
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        ) : (
          <FaMoon 
            size={24} 
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        )}
      </button>
    </div>
  );
}
