import { Link, useNavigate, useParams } from "react-router-dom";
import PhotoCard from "../../components/Cards/PhotoCard";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosClient.js";
import { FaArrowLeft as ArrowLeft } from "react-icons/fa";
import Modal from "../../components/Modal/Modal.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useMessage } from "../../contexts/MessageContext.jsx";

const PhotoShow = () => {

    const { user } = useAuth()

    const { slug } = useParams();

    const { setUserMessage } = useMessage();

    const navigate = useNavigate();

    const [photo, setPhoto] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false);
    const [validatedMode, setValidatedMode] = useState(false);

    const fetchPhoto = async () => {
        const res = await axios.get(`/photos/${slug}`);
        const newPhoto = res.data;
        setPhoto(newPhoto);
        setUserMessage(curr => ({ ...curr, name: newPhoto.user.name, id: newPhoto.userId, photoId: newPhoto.id }));
    }

    const deletePhoto = async () => {
        const res = await axios.delete(`/photos/${slug}`);
        navigate('/photos');
    }

    const changeValidated = async (validated) => {
        const res = await axios.patch(`/photos/${slug}`, { validated: !validated });

        if (res.status < 400) {
            fetchPhoto();
        }
    }

    useEffect(() => {
        fetchPhoto();
        return () => {
            setPhoto(null);
        }
    }, [])

    return (
        <section className="container">

            {photo && <> <button
                onClick={() => { navigate(-1) }}
                className='btn btn-secondary h-75 d-flex align-items-center gap-1 mb-4'
            >
                <ArrowLeft />Torna indietro
            </button>

                <PhotoCard
                    isShow={true}
                    title={photo?.title}
                    description={photo?.description}
                    image={photo?.image}
                    categories={photo?.categories}
                    author={photo?.user}
                    visible={photo?.visible}
                    slug={photo?.slug}
                    validated={photo?.validated}

                    // Apertura della Modale
                    onDelete={() => setDeleteMode(true)}
                    onValidated={() => setValidatedMode(true)}
                />

                {/* Modale */}
                {(deleteMode || validatedMode) &&
                    <Modal
                        isShow={deleteMode || validatedMode}

                        closeModal={() => {
                            setDeleteMode(false);
                            setValidatedMode(false);
                        }}

                        title={photo?.title}
                        author={photo?.user?.name}
                        userLogged={user}
                        deleteMode={deleteMode}
                        validatedMode={validatedMode}
                        validated={photo?.validated}
                        onValidated={changeValidated}
                        clickDelete={() => { deletePhoto(photo.slug) }}
                    />}

            </>}
        </section>
    )
}

export default PhotoShow;