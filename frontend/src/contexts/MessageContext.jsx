import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {

    const user = {
        name: '',
        id: '',
        photoId: ''
    }

    const [userMessage, setUserMessage] = useState(user);

    return (
        <MessageContext.Provider value={{ userMessage, setUserMessage }} >
            {children}
        </MessageContext.Provider>
    )
}

const useMessage = () => {
    const value = useContext(MessageContext);

    // Se non sono in un consumer del GlobalContext.Provider, value sarà undefined
    if (value === undefined) throw new Error('Non puoi settare lo User per i messaggi!');

    return value;
}

export { MessageProvider, useMessage }