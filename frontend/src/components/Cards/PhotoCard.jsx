import { Link, useNavigate } from 'react-router-dom';
import photoCardStyle from './PhotoCard.module.scss';
import { FaRegEye as FaEye } from "react-icons/fa";
import { BsFillPencilFill as Pencil } from "react-icons/bs";
import { FaRegTrashCan as Trash } from "react-icons/fa6";
import { useAuth } from '../../contexts/AuthContext';
import polaroid from '../../assets/img/polaroid.png'

const PhotoCard = ({ title, author, description, image, categories, visible, slug, isShow, onDelete }) => {

    const { user } = useAuth();

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/photos/${slug}`)} className={isShow ? photoCardStyle.showCard : photoCardStyle.indexCard}>

            <figure>
                <img src={`${image}`} alt={title} />
            </figure>

            <div className={`${photoCardStyle.dataCardBody} text-center`}>

                {isShow ? <h2>{title}</h2> : <h5>{title}</h5>}
                {isShow && <p>{description}</p>}

                <div className='d-flex align-items-center justify-content-center gap-2 pt-2'>

                    <figure>
                        <img src={polaroid} alt="polaroid" />
                    </figure>

                    <p>{author?.name}</p>

                </div>

                <div className={`${photoCardStyle.badgeContainer} d-flex align-items-center justify-content-center`}>

                    {categories?.map(({ id, label, color }) =>
                        <div key={`category-${id}`}>
                            <span className='badge me-2' style={{ backgroundColor: color }} >{label}</span>
                        </div>
                    )}

                </div>

                {isShow ?
                    <div className='d-flex justify-content-center gap-3'>
                        {(author?.name == user?.name || user?.isSuperAdmin) &&
                            <>
                                <Link to={`/photos/${slug}/edit`} className={`${photoCardStyle.dataBtn} btn btn-warning d-flex align-items-center gap-1 my-4`}><Pencil />Modifica</Link>
                                <button
                                    onClick={onDelete}
                                    className={`${photoCardStyle.dataBtn} btn btn-danger d-flex align-items-center gap-1 my-4`}>
                                    <Trash />Elimina
                                </button>
                            </>
                        }
                    </div> :

                    <div className='d-flex justify-content-center gap-3'>
                        {/* <Link to={`/photos/${slug}`} className={photoCardStyle.dataBtn}><FaEye />Vedi</Link> */}
                    </div>
                }

            </div>

        </div >
    )
}

export default PhotoCard;