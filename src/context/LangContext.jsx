import { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext(null);

export function LangProvider({ children }) {
    const [lang, setLang] = useState(() => localStorage.getItem('ew_lang') || 'en');
    const [theme, setTheme] = useState(() => localStorage.getItem('ew_theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('ew_theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('ew_lang', lang);
    }, [lang]);

    const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en');
    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

    return (
        <LangContext.Provider value={{ lang, toggleLang, theme, toggleTheme }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() { return useContext(LangContext); }
