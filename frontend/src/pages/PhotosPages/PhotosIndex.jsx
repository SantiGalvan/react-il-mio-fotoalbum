import { useEffect, useState } from "react";
import axios from "../../utils/axiosClient.js";
import PhotoCard from "../../components/Cards/PhotoCard.jsx";
import { FaPlus as Plus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { FaSearch } from "react-icons/fa";

const PhotosIndex = () => {

    const { user } = useAuth();

    const [photos, setPhotos] = useState([]);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterUser, setFilterUser] = useState('');

    const fetchPhotos = async () => {
        const res = await axios.get('/photos', { params: { title: filterTitle, user: filterUser } });
        const newPhotos = res.data.data;
        setPhotos(newPhotos);
    }

    useEffect(() => {
        fetchPhotos();
    }, [filterTitle, filterUser]);

    return (
        <section className="container">

            <div className='row mb-4'>

                <div className={user ? 'col-1' : 'col-12 text-center'}>
                    <h1 className="mb-4">Foto</h1>
                </div>

                {user &&
                    <div className="col-10 d-flex align-items-center justify-content-center gap-2">

                        <div className="input-group flex-nowrap w-25">
                            <span className="input-group-text"><FaSearch /></span>
                            <input
                                value={filterTitle}
                                onChange={e => setFilterTitle(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Cerca..."
                            />
                        </div>

                        <div className="form-check form-switch">
                            <input
                                checked={filterUser}
                                onChange={e => setFilterUser(e.target.checked)}
                                className="form-check-input"
                                type="checkbox" role="switch"
                                id="flexSwitchCheckDefault"
                            />

                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Le tue foto</label>
                        </div>

                    </div>
                }

                {user &&
                    <div className="col-1">
                        <Link
                            to={'/photos/create'}
                            className="btn btn-success d-flex align-items-center gap-1">
                            <Plus />Crea
                        </Link>
                    </div>
                }
            </div>

            <div className="row g-5">

                {photos?.map(({ id, title, image, categories, slug, user }) => (
                    <div key={`photo-${id}`} className="col-4">

                        <PhotoCard
                            title={title}
                            image={image}
                            categories={categories}
                            slug={slug}
                            author={user}
                        />

                    </div>
                ))}

            </div>
        </section>
    )
}

export default PhotosIndex;