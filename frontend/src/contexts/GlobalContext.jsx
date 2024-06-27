import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosClient.js';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const res = await axios.get('/categories');
        const newCategories = res.data;
        setCategories(newCategories);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <GlobalContext.Provider value={{ categories }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobal = () => {
    const value = useContext(GlobalContext);

    // Se non sono in un consumer del GlobalContext.Provider, value sarà undefined
    if (value === undefined) throw new Error('Non sei dentro al Global Provider!');

    return value;
}

export { GlobalProvider, useGlobal }