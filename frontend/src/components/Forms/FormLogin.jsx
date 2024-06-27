import { useState } from "react";

const FormLogin = ({ submitForm }) => {

    const initialData = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialData);

    const changeData = (key, value) => {
        setFormData(curr => ({ ...curr, [key]: value }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        submitForm(formData);
    }

    return (
        <div className="card">

            <form onSubmit={handleSubmit} className="card-body">
                <div className="row text-center">
                    <div className="offset-3 col-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={e => { changeData('email', e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="offset-3 col-6">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={e => { changeData('password', e.target.value) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="buttons d-flex justify-content-center gap-3 my-4">

                    {/* Bottoni */}
                    <button className="btn btn-primary d-flex align-items-center gap-1">Login</button>
                    <button type="reset" className="btn btn-danger d-flex align-items-center gap-1">Annulla</button>

                </div>
            </form>

        </div>
    )
}

export default FormLogin;