// app/components/ThemeSwitcher.tsx
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
          className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
          aria-label="Switch to dark mode"
        >
          <MdWbSunny className="text-2xl" />
        </button>
      ) : (
        <button
          onClick={() => setTheme('light')}
          className="p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700"
          aria-label="Switch to light mode"
        >
          <FaMoon className="text-2xl" />
        </button>
      )}
    </div>
  );
};
