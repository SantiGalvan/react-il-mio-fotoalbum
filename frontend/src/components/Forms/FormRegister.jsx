import { useState } from "react";

const FormRegister = ({ submitForm }) => {

    const initialData = {
        email: '',
        name: '',
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
        <div className="card pt-3">
            <form onSubmit={handleSubmit} className="card-body">
                <div className="row">
                    <div className="offset-3 col-6">
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
                                onChange={e => changeData('email', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="offset-3 col-6">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input
                                type="name"
                                className="form-control"
                                id="name"
                                placeholder="Nome"
                                name="name"
                                value={formData.name}
                                onChange={e => changeData('name', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="offset-3 col-6">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password<span className="text-danger"><sup>*</sup></span></label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={e => changeData('password', e.target.value)}
                            />
                        </div>
                    </div>
                    <p className="text-center mb-0">I campi contrassegnati con <span className="text-danger"><sup>*</sup></span> sono obbligatori</p>
                </div>
                <div className="buttons d-flex justify-content-center gap-3 my-4">

                    {/* Bottoni */}
                    <button className="btn btn-success d-flex align-items-center gap-1">Registrati</button>
                    <button type="reset" className="btn btn-danger d-flex align-items-center gap-1">Annulla</button>

                </div>
            </form>
        </div>
    )
}

export default FormRegister;