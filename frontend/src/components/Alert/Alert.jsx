const Alert = ({ errors, closeAlert }) => {
    return (
        <div className="alert w-50 m-auto mb-4 alert-danger alert-dismissible fade show">
            {typeof errors === 'array' ?
                <ul>
                    {errors.map((err, index) => <li key={`err-${index}`} >{err}</li>)}
                </ul> :
                <li>{errors}</li>
            }
            <button onClick={closeAlert} type="button" className="btn-close" aria-label="Close"></button>
        </div>
    )
}

export default Alert;