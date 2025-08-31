import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../provider/ThemeProvider'

const ThemeToggler = () => {
    const { isDark, toggleTheme } = useTheme()
    return (
        <button
            onClick={toggleTheme}
            className="text-gray-200 dark:text-yellow-500 transition-colors rounded "
        >
            {
                isDark ? <FaSun /> : <FaMoon />
            }
        </button>
    )
}

export default ThemeToggler
