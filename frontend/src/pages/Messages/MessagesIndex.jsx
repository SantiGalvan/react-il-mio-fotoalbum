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
    const [filterUser, setFilterUser] = useState('');

    const fetchMessages = async () => {
        const res = await axios.get('/messages', { params: { filteredUser: filterUser } });
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
    }, [filterUser]);

    return (
        <section className="container">

            <div className='d-flex align-items-center justify-content-center gap-4 mb-4'>

                <h1>Messaggi</h1>

                {user.isSuperAdmin &&
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="filteredUser"
                            checked={filterUser}
                            onChange={e => setFilterUser(e.target.checked)}
                        />
                        <label className="form-check-label" for="filteredUser">Messaggi di {user.name}</label>
                    </div>
                }
            </div>

            {messages && <MessagesTable onDelete={messageId} messages={messages} />}

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