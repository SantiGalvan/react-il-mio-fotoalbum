import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PhotoForm from "../../components/Forms/PhotoForm";
import axios from '../../utils/axiosClient.js';

const PhotoCreate = () => {

    const navigate = useNavigate();

    const createPhoto = async (formData) => {
        const res = await axios.post('photos', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

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
                <h1 className="title">Crea la tua Foto</h1>
            </div>

            <PhotoForm onSubmit={createPhoto} />

        </section>
    )
}

export default PhotoCreate;