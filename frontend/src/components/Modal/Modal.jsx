import { FaTimes, FaTrashAlt } from "react-icons/fa";

const Modal = ({ isShow, closeModal, title, author, clickDelete, deleteMode, clickLogout, category, deleteCategory }) => {
    return (
        <div className="modal" style={isShow ? { display: 'flex' } : ''} tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">
                        <h2 className="modal-title">{title ? title : category[0]?.label}</h2>
                        <button onClick={closeModal} type="button" className="btn-close"></button>
                    </div>

                    {deleteMode ?
                        <div className="modal-body text-center">
                            {author ?
                                <p>Sicuro di voler eliminare <strong>{title}</strong> di <strong>{author}</strong>?</p> :
                                <p>Sicuro di voler eliminare <strong>{title ? title : category[0]?.label}</strong>?</p>
                            }
                        </div> :
                        <div className="modal-body text-center">
                            <p>Sicuro di voler effettuare il logout?</p>
                        </div>
                    }

                    <div className="modal-footer d-flex align-items-center justify-content-between">

                        <button
                            onClick={closeModal}
                            type="button"
                            className='btn btn-secondary d-flex align-items-center gap-1'>
                            <FaTimes />Chiudi
                        </button>

                        {deleteMode ?
                            <button
                                onClick={clickDelete}
                                type="button"
                                className='btn btn-danger d-flex align-items-center gap-1'
                            >
                                <FaTrashAlt />Elimina
                            </button> :
                            <button
                                onClick={clickLogout}
                                type="button"
                                className='btn btn-danger d-flex align-items-center gap-1'
                            >
                                Logout
                            </button>
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Modal;