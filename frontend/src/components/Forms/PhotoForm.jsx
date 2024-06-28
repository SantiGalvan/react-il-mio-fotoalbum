import { useState } from 'react';
import { useGlobal } from '../../contexts/GlobalContext';
import { TiPlus as Plus } from "react-icons/ti";
import { BsArrowClockwise } from "react-icons/bs";

const PhotoForm = ({ onSubmit }) => {

    const { categories } = useGlobal();

    const initialData = {
        title: '',
        description: '',
        image: '',
        visible: true,
        categories: []
    }

    const [formData, setFormData] = useState(initialData);

    const handleField = (key, value) => {
        setFormData(curr => ({ ...curr, [key]: value }));
    }

    const handleCategories = id => {

        const curr = formData.categories;
        const newCategories = curr.includes(id) ?
            curr.filter(element => element !== id) :
            [...curr, id];
        handleField('categories', newCategories);

    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(initialData);
    }

    return (
        <div className="card p-4">
            <form onSubmit={handlesubmit} className="card-body">
                <div className="row">
                    <div className="col-6">

                        <div className="col-12">

                            {/* Titolo */}
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Titolo della foto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Titolo del post"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => handleField('title', e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="col-12">

                            {/* Immagine */}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Carica la foto</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    onChange={(e) => handleField('image', e.target.files[0])}
                                />
                            </div>

                        </div>

                        <div className="col-12">

                            {/* Switch Visible */}
                            <div className="mb-3 d-flex gap-2">
                                <label className="form-check-label" htmlFor="visible">Foto visibile:</label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="visible"
                                        checked={formData.visible}
                                        onChange={(e) => handleField('visible', e.target.checked)}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="col-6">

                        {/* Descrizione */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descrizione della foto</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="6"
                                onChange={(e) => handleField('description', e.target.value)}
                                value={formData.description}
                            ></textarea>
                        </div>

                    </div>

                    <div className="col-12 my-3">

                        {/* Categorie */}
                        <p className="text-center">Categorie</p>
                        <div className="checks d-flex justify-content-center">
                            {categories.map(({ id, label }) => (
                                <div key={`category-${id}`} className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`category-${id}`}
                                        checked={formData.categories.includes(id)}
                                        onChange={() => handleCategories(id)}
                                    />
                                    <label className="form-check-label" htmlFor={`categories-${id}`}>{label}</label>
                                </div>
                            ))}
                        </div>

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

export default PhotoForm;