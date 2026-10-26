import { createContext, useContext, useState } from 'react';

export const LangContext = createContext();

export function LangProvider({ children }) {
    const [lang, setLang] = useState('en');
    const toggle = () => setLang(l => (l === 'en' ? 'fr' : 'en'));
    return (
        <LangContext.Provider value={{ lang, toggle }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    return useContext(LangContext);
}
