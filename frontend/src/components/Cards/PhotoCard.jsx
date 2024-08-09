import { Link, useNavigate } from 'react-router-dom';
import photoCardStyle from './PhotoCard.module.scss';
import { BsFillPencilFill as Pencil } from "react-icons/bs";
import { FaRegTrashCan as Trash } from "react-icons/fa6";
import { useAuth } from '../../contexts/AuthContext';
import { GrValidate } from "react-icons/gr";
import polaroid from '../../assets/img/polaroid.png'

const PhotoCard = ({ title, author, description, image, categories, visible, slug, isShow, onDelete, validated }) => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const goShow = () => {
        if (isShow) {
            return
        } else {
            navigate(`/photos/${slug}`)
        }
    }

    return (
        <div onClick={goShow} className={`${isShow ? photoCardStyle.showCard : photoCardStyle.indexCard} ${visible ? '' : photoCardStyle.invisible} ${validated ? '' : photoCardStyle.invalid}`}>

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

                <div className={`${photoCardStyle.badgeContainer} d-flex align-items-center justify-content-center ${(author?.name == user?.name || user?.isSuperAdmin) && isShow ? '' : 'mb-4'}`}>

                    {categories?.map(({ id, label, color }) =>
                        <div key={`category-${id}`}>
                            <span className='badge me-2' style={{ backgroundColor: color }} >{label}</span>
                        </div>
                    )}

                </div>

                {isShow &&

                    <div className='d-flex justify-content-center gap-3'>
                        {(author?.name == user?.name || user?.isSuperAdmin) &&
                            <>
                                <Link to={`/photos/${slug}/edit`} className={`${photoCardStyle.dataBtn} btn btn-warning d-flex align-items-center gap-1 my-4`}><Pencil />Modifica</Link>

                                {(user.isSuperAdmin && !validated) &&
                                    <button
                                        className={`${photoCardStyle.dataBtn} btn btn-success d-flex align-items-center gap-1 my-4`}>
                                        <GrValidate />Valida
                                    </button>
                                }

                                <button
                                    onClick={onDelete}
                                    className={`${photoCardStyle.dataBtn} btn btn-danger d-flex align-items-center gap-1 my-4`}>
                                    <Trash />Elimina
                                </button>
                            </>
                        }

                    </div>

                }

            </div>

        </div >
    )
}

export default PhotoCard;