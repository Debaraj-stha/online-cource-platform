import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../provider/ThemeProvider';

const ThemeToggler = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
      title="Toggle theme"
    >
      {isDark ? (
        <FaSun className="text-yellow-400 text-lg" />
      ) : (
        <FaMoon className="text-blue-400 text-lg" />
      )}
    </button>
  );
};

export default ThemeToggler;
