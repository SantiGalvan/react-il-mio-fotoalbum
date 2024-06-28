import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import MessageForm from "../../components/Forms/MessageForm";
import axios from '../../utils/axiosClient.js';
import { useState } from "react";
import MessageAlert from "../../components/Alert/MessageAlert.jsx";
import { useNavigate } from "react-router-dom";

const MessageCreate = () => {

    const navigate = useNavigate();

    const [messageSubmit, setMessageSubmit] = useState();
    const [messageError, setMessageError] = useState();

    const createMessage = async (formData) => {
        try {
            const res = await axios.post('/messages', formData);
            if (res.status < 400) setMessageSubmit(true);
        } catch (err) {
            setMessageError(true);
        }



    }


    return (
        <section className="container">

            <div className="mb-4 d-flex align-items-center justify-content-between">

                <button
                    onClick={() => { navigate(-1) }}
                    className='btn btn-secondary h-75 d-flex align-items-center gap-1'
                >
                    <ArrowLeft />Torna indietro
                </button>

                <h1>Invia un messaggio</h1>

            </div>

            {(messageSubmit || messageError) &&
                <MessageAlert
                    type={messageSubmit ? 'success' : 'danger'}
                    closeAlert={() => {
                        setMessageSubmit(false);
                        setMessageError(false);
                    }}
                />
            }

            <MessageForm onSubmit={createMessage} />

        </section>
    )
}

export default MessageCreate;