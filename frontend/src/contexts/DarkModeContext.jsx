import { createContext, useContext } from "react";
import useLocalStorage from 'use-local-storage';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {

    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDark, setIsDark] = useLocalStorage('isDark', preference);

    return (
        <DarkModeContext.Provider value={{ isDark, setIsDark }} >
            {children}
        </DarkModeContext.Provider>
    )
}

const useDarkMode = () => {
    const value = useContext(DarkModeContext);

    // Se non sono in un consumer del GlobalContext.Provider, value sarà undefined
    if (value === undefined) throw new Error('Non puoi settare la Dark Mode!');

    return value;
}

export { DarkModeProvider, useDarkMode }