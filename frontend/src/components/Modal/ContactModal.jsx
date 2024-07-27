import { useState } from "react";
import MessageForm from "../Forms/MessageForm";

const ContactModal = ({ isShow, closeModal, onSubmit, userMessage }) => {

    return (
        <div className="modal" style={isShow ? { display: 'flex' } : ''} tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        {userMessage.name ?
                            <h2 className="modal-title">Invia un messaggio a {userMessage.name}</h2> :
                            <h2 className="modal-title">Invia un messaggio all'admin</h2>
                        }

                        <button onClick={closeModal} type="button" className="btn-close"></button>

                    </div>


                    <div className="modal-body text-center">

                        <MessageForm onSubmit={onSubmit} userId={userMessage ? userMessage.id : ''} photoId={userMessage ? userMessage.photoId : ''} />

                    </div>



                </div>

            </div>

        </div>
    )
}

export default ContactModal;