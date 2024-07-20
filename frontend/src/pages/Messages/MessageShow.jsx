import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../utils/axiosClient.js';
import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import { FaRegTrashCan as Trash } from "react-icons/fa6";
import Modal from "../../components/Modal/Modal.jsx";

const MessageShow = () => {

    const { id } = useParams();

    const [message, setMessage] = useState();
    const [deleteMode, setDeleteMode] = useState(false);

    const navigate = useNavigate();

    const fetchMessage = async () => {
        const res = await axios.get(`/messages/${id}`);
        setMessage(res.data);
    }

    const deleteMessage = async () => {
        const res = await axios.delete(`/messages/${id}`);
        navigate('/messages');
    }

    useEffect(() => {
        fetchMessage();
    }, [])

    return (
        <section className="container">

            <div className="mb-4 d-flex justify-content-between align-items-center">
                <button
                    onClick={() => { navigate(-1) }}
                    className='btn btn-secondary h-75 d-flex align-items-center gap-1 mb-4'
                >
                    <ArrowLeft />Torna indietro
                </button>

                <h1>Messaggio</h1>

                <button
                    onClick={() => { setDeleteMode(true) }}
                    className='btn btn-danger d-flex align-items-center gap-1 my-4'>
                    <Trash />Elimina
                </button>
            </div>

            <div className="card p-4 text-center">

                <div className="card p-4 mb-4">
                    <h4>Email: </h4>
                    <p className="mb-0">{message?.email}</p>
                </div>

                <div className="card p-4 mb-4">
                    <h4>Contenuto del messaggio: </h4>
                    <p className="mb-0">{message?.content}</p>
                    <p className="mt-3"><strong>Messaggio del: </strong>{message?.createdAt}</p>
                </div>

            </div>

            {deleteMode &&
                <Modal
                    isShow={deleteMode}
                    closeModal={() => setDeleteMode(false)}
                    message={message}
                    deleteMode={true}
                    clickDelete={() => { deleteMessage() }}
                />}

        </section>
    )
}

export default MessageShow;