import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import axios from '../../utils/axiosClient.js';
import CategoryForm from "../../components/Forms/CategoryForm.jsx";

const CategoryEdit = () => {

    const { slug } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const res = await axios.get(`/categories/${slug}`)
        const { label, color } = res.data;

        setDataToEdit({ label, color });
    }

    const updateCategory = async (formData) => {
        const res = await axios.put(`/categories/${slug}`, formData);

        if (res.status < 400) navigate('/categories');
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    }, [slug])

    return (
        <section className="container">

            <div className="mb-4 d-flex align-items-center justify-content-between">

                <button
                    onClick={() => { navigate(-1) }}
                    className='btn btn-secondary h-75 d-flex align-items-center gap-1'
                >
                    <ArrowLeft />Torna indietro
                </button>

                <h1 className="title">Modifica la Categoria</h1>

            </div>

            {dataToEdit === null ?
                <h3 className="text-center">Loading...</h3> :
                <CategoryForm
                    dataEdit={dataToEdit}
                    onSubmit={updateCategory}
                />}

        </section>
    )
}

export default CategoryEdit;