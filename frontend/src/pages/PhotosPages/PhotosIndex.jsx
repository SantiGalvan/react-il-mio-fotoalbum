import { useEffect, useState } from "react";
import axios from "../../utils/axiosClient.js";
import PhotoCard from "../../components/Cards/PhotoCard.jsx";
import { FaPlus as Plus } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useMessage } from "../../contexts/MessageContext.jsx";

const PhotosIndex = () => {

    const { user } = useAuth();

    const { setUserMessage } = useMessage();

    const [photos, setPhotos] = useState([]);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterUser, setFilterUser] = useState('');
    const [totalPages, setTotalPages] = useState();

    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    const currentPage = parseInt(searchParams.get('page'));

    const fetchPhotos = async () => {
        const res = await axios.get('/photos', { params: { title: filterTitle, user: filterUser, page: currentPage } });
        const newPhotos = res.data.data;
        const totPages = res.data.totalPages;
        setPhotos(newPhotos);
        setTotalPages(totPages);
    }

    const changedPages = (direction, element) => {
        if (direction === 'prev') setSearchParams({ page: currentPage - 1 > 0 ? currentPage - 1 : 1 });

        if (direction === 'next') setSearchParams({ page: currentPage >= totalPages ? totalPages : currentPage + 1 });

        if (direction === null) setSearchParams({ page: element });
    }

    useEffect(() => {
        fetchPhotos();
        setUserMessage({})
    }, [filterTitle, filterUser, searchParams]);

    return (
        <section className="container">

            {/* Titolo, Filtri, Bottone */}
            <div className='row mb-2'>

                {/* titolo */}
                <div className='col-1'>
                    <h1 className="mb-4 title">Foto</h1>
                </div>

                {/* Filtri */}

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


                    {(photos.length !== 0 || !filterTitle) && user && <div className="form-check form-switch">
                        <input
                            checked={filterUser}
                            onChange={e => setFilterUser(e.target.checked)}
                            className="form-check-input"
                            type="checkbox" role="switch"
                            id="flexSwitchCheckDefault"
                        />

                        <label className="form-check-label label" htmlFor="flexSwitchCheckDefault">Le tue foto</label>
                    </div>}

                </div>

                {/* Bottone */}
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

            {photos.length !== 0 ? <>
                {/* Card e paginazione */}
                <div className="row g-5">

                    {/* Cards */}
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

                {/* Paginazione */}
                {(filterUser || totalPages <= 1) || <div className="d-flex align-items-center justify-content-center mt-5">

                    <Pagination totalPages={totalPages} currentPage={currentPage} buttonClick={changedPages} />

                </div>}

            </> :
                <div className="row mt-5">
                    {filterTitle &&
                        <h3 className="text-center mt-5 title">Non ci sono foto con questo titolo: {filterTitle}</h3>}
                    {filterUser &&
                        <h3 className="text-center mt-5 title">Ei {user.name} non hai ancora caricato tue foto, cosa aspetti? Clicca subito il tasto crea</h3>
                    }
                </div>

            }


        </section >
    )
}

export default PhotosIndex;