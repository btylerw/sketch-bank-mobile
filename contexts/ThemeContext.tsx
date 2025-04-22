import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeType, setThemeType] = useState('light');

    const toggleTheme = () => {
        setThemeType((prev => (prev === 'light' ? 'dark' : 'light')));
    };

    return (
        <ThemeContext.Provider value={{ themeType, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};