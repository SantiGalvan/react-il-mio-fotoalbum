import { useEffect, useState } from 'react';
import axios from '../../utils/axiosClient.js';
import MessagesTable from '../../components/Table/MessagesTable.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import { useAuth } from '../../contexts/AuthContext';

const MessagesIndex = () => {

    const { user } = useAuth();

    const [messages, setMessages] = useState();
    const [deleteMode, setDeleteMode] = useState(false);
    const [messageDelete, setMessageDelete] = useState();

    const fetchMessages = async () => {
        const res = await axios.get('/messages');
        const newMessages = res.data;
        setMessages(newMessages);
    }

    const messageId = (id) => {
        setDeleteMode(true);
        const message = messages.filter(message => message.id === id);
        setMessageDelete(message);
    }

    const deleteMessage = async () => {
        const res = await axios.delete(`/messages/${messageDelete[0].id}`);

        fetchMessages()

        setDeleteMode(false);
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    return (
        <section className="container">

            <h1 className='text-center mb-4'>Messaggi</h1>

            <MessagesTable onDelete={messageId} messages={messages} />

            {deleteMode &&
                <Modal
                    isShow={deleteMode}
                    closeModal={() => setDeleteMode(false)}
                    message={messageDelete}
                    userLogged={user}
                    deleteMode={true}
                    clickDelete={deleteMessage}
                />}

        </section>
    )
}

export default MessagesIndex;