import { useState } from "react";
import MessageForm from "../Forms/MessageForm";

const ContactModal = ({ isShow, closeModal, onSubmit }) => {

    return (
        <div className="modal" style={isShow ? { display: 'flex' } : ''} tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h2 className="modal-title">Invia un messaggio</h2>

                        <button onClick={closeModal} type="button" className="btn-close"></button>

                    </div>


                    <div className="modal-body text-center">

                        <MessageForm onSubmit={onSubmit} />

                    </div>



                </div>

            </div>

        </div>
    )
}

export default ContactModal;