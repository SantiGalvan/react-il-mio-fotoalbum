import { useEffect, useState } from "react";

const Toast = ({ user, closeToast }) => {

    const [date, setDate] = useState();

    const formattedDate = () => {
        const date = new Date;
        setDate(date.toLocaleString('it-it'));
    }

    useEffect(() => {
        formattedDate();
    }, [user])

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div className={`toast ${user ? 'show' : ''}`}>
                <div className="toast-header">
                    <strong className="me-auto">Cambio ruolo</strong>
                    <small>{date}</small>
                    <button onClick={closeToast} className="btn-close" aria-label="Close"></button>
                </div>
                <div className="toast-body d-flex flex-column align-items-center">
                    {user && <p><strong>{user[0].name}</strong>, ha assunto il ruolo di: <strong>{!user[0].isAdmin ? 'Admin' : 'User'}</strong></p>}
                </div>
            </div>
        </div>
    )
}

export default Toast;