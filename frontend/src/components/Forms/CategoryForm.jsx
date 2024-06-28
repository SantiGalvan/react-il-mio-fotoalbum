import { useState } from "react";
import { TiPlus as Plus } from "react-icons/ti";
import { BsArrowClockwise } from "react-icons/bs";

const CategoryForm = ({ onSubmit, dataEdit }) => {

    const initialData = dataEdit || {
        label: '',
        color: ''
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
        <div className="card p-4">
            <form onSubmit={handleSubmit} className="card-body">

                <div className="row">

                    <div className="offset-2 col-6">

                        {/* Titolo */}
                        <div className="mb-3">
                            <label htmlFor="label" className="form-label">Titolo della categoria</label>
                            <input
                                type="text"
                                className="form-control"
                                id="label"
                                placeholder="Titolo dela categoria"
                                name="label"
                                value={formData.label}
                                onChange={(e) => handleField('label', e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="col-2 text-center">
                        <label htmlFor="color" className="form-label">Colore della categoria</label>
                        <input
                            type="text"
                            className="form-control form-control-color w-100"
                            placeholder="ES: #FFF"
                            id="color"
                            value={formData.color}
                            onChange={(e) => handleField('color', e.target.value)}
                        />
                    </div>

                    <div className="buttons d-flex justify-content-center gap-3 my-4">

                        {/* Bottoni */}
                        <button className="btn btn-success d-flex align-items-center gap-1"><Plus />Crea</button>
                        <button type="reset" className="btn btn-warning d-flex align-items-center gap-1"><BsArrowClockwise />Reset</button>

                    </div>

                </div>

            </form>
        </div>
    )
}

export default CategoryForm;