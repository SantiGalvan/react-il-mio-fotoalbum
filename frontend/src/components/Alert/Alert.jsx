const Alert = ({ generalError, closeAlert }) => {
    return (
        <div className="alert w-50 m-auto mb-4 alert-danger alert-dismissible fade show">
            <ul>
                {generalError !== null && <li>{generalError.message}</li>}
                {generalError?.errors && generalError.errors.map((err, index) => (
                    <li key={`err-${index}`}>{err.msg}</li>
                ))}
            </ul>
            <button onClick={closeAlert} type="button" className="btn-close" aria-label="Close"></button>
        </div >
    )
}

export default Alert;