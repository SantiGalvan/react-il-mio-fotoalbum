import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import PhotoForm from "../../components/Forms/PhotoForm";
import axios from '../../utils/axiosClient.js'

const PhotoEdit = () => {

    const { slug } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const res = await axios.get(`/photos/${slug}`);
        const { title, description, image, visible, categories } = res.data;

        setDataToEdit({
            title,
            description,
            image,
            visible,
            categories: categories.map(category => category.id)
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    }, [slug]);

    const updatePhoto = async (formData) => {
        const res = await axios.put(`/photos/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        if (res.status < 400) navigate(`/photos/${res.data.slug}`);
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
                <h1 className="title">Modifica la tua Foto</h1>
            </div>

            {dataToEdit === null ?
                <h3 className="text-center">Loading...</h3> :
                <PhotoForm
                    dataEdit={dataToEdit}
                    onSubmit={updatePhoto}
                />
            }

        </section>
    )
}

export default PhotoEdit;