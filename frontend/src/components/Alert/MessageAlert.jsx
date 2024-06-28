const MessageAlert = ({ closeAlert, type }) => {
    return (
        <div className={`alert w-50 m-auto mb-4 alert-${type} alert-dismissible fade show`}>
            {type === 'success' ? <p>Messaggio inviato con successo</p> : <p>Messaggio non inviato</p>}
            <button onClick={closeAlert} type="button" className="btn-close" aria-label="Close"></button>
        </div >
    )
}

export default MessageAlert;