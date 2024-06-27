import { useEffect, useState } from "react";
import axios from "../../utils/axiosClient.js";

const PhotosIndex = () => {

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
            <h1 className="text-center">Foto</h1>
            <div className="row">
                {photos?.map(({ id, title }) => (
                    <div key={`photo-${id}`} className="col-4">
                        <p>{title}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PhotosIndex;