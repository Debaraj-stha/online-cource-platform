import  { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark"
    })


    const toggleTheme = () => {
        const newTheme = !isDark ? 'dark' : 'light';
        setDark(!isDark);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error("useTheme must be used within ThemeProvider")
    return context
}

export default ThemeProvider
