import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Forms/CategoryForm";
import axios from '../../utils/axiosClient.js';

const CategoryCreate = () => {

    const navigate = useNavigate();

    const createCategory = async (formData) => {

        const res = await axios.post('categories', formData);

        if (res.status < 400) navigate(`/categories`);

    }

    return (
        <section className="container">

            <div className="mb-4 d-flex align-items-center justify-content-between">

                <button
                    onClick={() => { navigate(-1) }}
                    className='btn btn-secondary h-75 d-flex align-items-center gap-1'
                >
                    <ArrowLeft />Torna indietro
                </button>

                <h1 className="title">Crea una Categoria</h1>

            </div>

            <CategoryForm onSubmit={createCategory} />

        </section>
    )
}

export default CategoryCreate;