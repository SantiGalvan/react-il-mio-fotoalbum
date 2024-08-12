import { useEffect, useState } from "react";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { RxCrossCircled } from "react-icons/rx";

const Modal = ({ isShow, closeModal, title, author, clickDelete, deleteMode, validatedMode, logoutMode, clickLogout, category, message, user, validated, onValidated }) => {

    const [abstractMessage, setAbstractMessage] = useState();

    const getAbstractMessage = () => {
        if (message) {
            const messageContent = message[0] === undefined ? message.content : message[0].content;
            const newContent = messageContent.length > 60 ? messageContent.substr(0, 60) + '...' : messageContent;
            setAbstractMessage(newContent);
        }
    }

    useEffect(() => {
        getAbstractMessage();
    }, [])


    return (
        <div className="modal" style={isShow ? { display: 'flex' } : ''} tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        {title && <h2 className="modal-title">{title}</h2>}

                        {category && <h2 className="modal-title">{category[0].label}</h2>}

                        {message && <h2 className="modal-title">{abstractMessage}</h2>}

                        {user && <h2 className="modal-title">{user[0].name}</h2>}

                        <button onClick={closeModal} type="button" className="btn-close"></button>

                    </div>

                    {/* Modalità eliminazione foto */}
                    {deleteMode &&
                        <div className="modal-body text-center">

                            {author && <p>Sicuro di voler eliminare <strong>{title}</strong> di <strong>{author}</strong>?</p>}

                            {category && <p>Sicuro di voler eliminare <strong>{category[0].label}</strong>?</p>}

                            {message && <p>Sicuro di voler eliminare <strong>{abstractMessage}</strong>?</p>}

                            {user && <p>Sicuro di voler eliminare <strong>{user[0].name}</strong> con email: <strong>{user[0].email}</strong> e ruolo <strong>{`${user[0].isAdmin ? 'admin' : 'user'}`}</strong>?</p>}

                        </div>
                    }

                    {/* Modalità logout */}
                    {logoutMode &&
                        <div className="modal-body text-center">
                            <p>Sicuro di voler effettuare il logout?</p>
                        </div>
                    }

                    {/* Modalità validazione foto */}
                    {validatedMode &&
                        <div className="modal-body text-center">

                            {/* Testo se la foto non è valida */}
                            {(author && !validated) &&
                                <p>Sicuro di voler accettare la pubblicazione di <strong>{title}</strong> creato da <strong>{author}</strong>?
                                    Verrà inviata un'email all'autore per informarlo
                                </p>
                            }

                            {/* Testo se la foto è valida */}
                            {(author && validated) &&
                                <p>Sicuro di voler annullare la pubblicazione di <strong>{title}</strong> creato da <strong>{author}</strong>?
                                    Verrà inviata un'email all'autore per informarlo
                                </p>
                            }

                        </div>
                    }

                    <div className="modal-footer d-flex align-items-center justify-content-between">

                        <button
                            onClick={closeModal}
                            type="button"
                            className='btn btn-secondary d-flex align-items-center gap-1'>
                            <FaTimes />Chiudi
                        </button>

                        {/* Bottoni della modalità eliminazione */}
                        {deleteMode &&
                            <button
                                onClick={clickDelete}
                                type="button"
                                className='btn btn-danger d-flex align-items-center gap-1'
                            >
                                <FaTrashAlt />Elimina
                            </button>
                        }

                        {/* Bottoni della modalità Logout */}
                        {logoutMode &&
                            <button
                                onClick={clickLogout}
                                type="button"
                                className='btn btn-danger d-flex align-items-center gap-1'
                            >
                                Logout
                            </button>
                        }

                        {/* Bottini della modalità validazione */}
                        {validatedMode &&
                            <button
                                onClick={() => {
                                    onValidated(validated);
                                    closeModal();
                                }}
                                className={`btn btn-${validated ? 'danger' : 'success'} d-flex align-items-center gap-1`}>
                                {validated ? <RxCrossCircled /> : <GrValidate />}
                                {validated ? 'Invalida' : 'Valida'}
                            </button>
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Modal;