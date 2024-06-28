import { useEffect, useState } from "react";
import axios from "../../utils/axiosClient.js";
import PhotoCard from "../../components/Cards/PhotoCard.jsx";
import { FaPlus as Plus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

const PhotosIndex = () => {

    const { user } = useAuth();

    const [photos, setPhotos] = useState();

    const fetchPhotos = async () => {
        const res = await axios.get('/photos');
        const newPhotos = res.data.data;
        setPhotos(newPhotos);
    }

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <section className="container">
            <div className={user ? "d-flex align-items-center justify-content-between" : ""}>
                {user && <div>Filtri</div>}
                <h1 className="text-center mb-4">Foto</h1>
                {user && <Link to={'/photos/create'} className="btn btn-success d-flex align-items-center gap-1"><Plus />Crea</Link>}
            </div>
            <div className="row g-5">

                {photos?.map(({ id, title, image, categories }) => (
                    <div key={`photo-${id}`} className="col-4">

                        <PhotoCard
                            title={title}
                            image={image}
                            categories={categories}
                        />

                    </div>
                ))}

            </div>
        </section>
    )
}

export default PhotosIndex;