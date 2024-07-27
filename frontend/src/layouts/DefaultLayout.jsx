import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useDarkMode } from "../contexts/DarkModeContext";
import MessageIcon from "../components/Message/MessageIcon";
import { useAuth } from "../contexts/AuthContext";
import { useMessage } from "../contexts/MessageContext";
import { useState } from "react";
import ContactModal from "../components/Modal/ContactModal";
import MessageAlert from "../components/Alert/MessageAlert";
import axios from '../utils/axiosClient.js';

const DefaultLayout = () => {

    const { user } = useAuth();

    const { isDark } = useDarkMode();

    const { userMessage } = useMessage();

    const [isMessage, setIsMessage] = useState(false);
    const [messageSubmit, setMessageSubmit] = useState();
    const [messageError, setMessageError] = useState();

    const createMessage = async (formData) => {

        setIsMessage(false);

        try {
            const res = await axios.post('/messages', formData);
            if (res.status < 400) setMessageSubmit(true);
        } catch (err) {
            setMessageError(true);
        }
    }

    return (
        <div className="App" data-theme={isDark ? 'dark' : 'light'}>

            <Navbar />

            <main>

                {(messageSubmit || messageError) &&
                    <MessageAlert
                        type={messageSubmit ? 'success' : 'danger'}
                        closeAlert={() => {
                            setMessageSubmit(false);
                            setMessageError(false);
                        }}
                    />
                }

                <Outlet />

                {!user && <MessageIcon setMessage={() => setIsMessage(true)} />}

                {isMessage &&
                    <ContactModal
                        isShow={isMessage}
                        closeModal={() => setIsMessage(false)}
                        onSubmit={createMessage}
                        userMessage={userMessage ? userMessage : ''}
                    />
                }

            </main>


        </div>
    )
}

export default DefaultLayout;