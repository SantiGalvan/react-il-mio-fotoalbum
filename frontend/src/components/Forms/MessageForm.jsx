import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { BsArrowClockwise } from "react-icons/bs";

const MessageForm = ({ onSubmit, userId, photoId }) => {

    const initialData = {
        email: '',
        content: '',
        userId,
        photoId
    }

    const [formData, setFormData] = useState(initialData);

    const handleField = (key, value) => {
        setFormData(curr => ({ ...curr, [key]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(initialData);
    }

    return (
        <form onSubmit={handleSubmit} className="card.body" noValidate>

            <div className="row">

                <div className="offset-1 col-10">

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email<span className="text-danger"><sup>*</sup></span></label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={e => handleField('email', e.target.value)}
                        />
                    </div>

                </div>

                <div className="offset-1 col-10">

                    {/* Testo del messaggio */}
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Messaggio da inviare</label>
                        <textarea
                            className="form-control"
                            id="content"
                            rows="6"
                            onChange={(e) => handleField('content', e.target.value)}
                            value={formData.content}
                        ></textarea>
                    </div>

                </div>

                <div className="buttons d-flex justify-content-center gap-3 my-4">

                    {/* Bottoni */}
                    <button className="btn btn-success d-flex align-items-center gap-1"><IoIosSend />Invia</button>
                    <button type="reset" className="btn btn-warning d-flex align-items-center gap-1"><BsArrowClockwise />Reset</button>

                </div>

            </div>

        </form>
    )
}

export default MessageForm;