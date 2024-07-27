import { useEffect, useState } from "react";
import axios from '../utils/axiosClient.js';
import { Link } from "react-router-dom";
import logoImg from "../assets/img/logo-navbar.jpg";

const Home = () => {

    const [images, setImages] = useState();
    const [totImages, setTotImages] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchImages = async () => {
        const res = await axios.get('/photos', { params: { limit: 40 } });
        const photos = res.data.data;
        const images = photos.map(photo => photo.image);
        setImages(images);
        setTotImages(images.length);
    }

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {

            setCurrentIndex(curr => {

                if (curr >= totImages - 1) curr = curr - totImages;

                return curr + 1;
            }
            );

        }, 2000);

        return () => {
            clearTimeout(timeout);
        }
    }, [currentIndex]);

    return (
        <section className="py-0">
            <div className="carousel-container container-fluid ps-0" >
                <div className="row">

                    <div className="col-8 d-flex align-items-center justify-content-center">

                        {images?.map((img, index) => (
                            <figure key={`img-${index}`} className={`carousel ${currentIndex === index ? 'show' : ''}`}>
                                <img src={img} alt="" className="img-fluid w-100 h-100" />
                            </figure>
                        ))}

                    </div>

                    <div className="col-4 d-flex flex-column align-items-center text-center gap-3 mt-5">

                        <figure className="home-logo">
                            <img src={logoImg} alt="Logo" className="img-fluid" />
                        </figure>

                        <h1 className="title shdw">Benvenuto su PhotoBlog, vuoi postare anche tu le tue foto? Allora registrati</h1>

                        <Link to={'/register'} className="register-btn">Registrati</Link>

                    </div>

                </div>


            </div>

        </section>
    )
}

export default Home;