import photoCardStyle from './PhotoCard.module.scss';
import { FaRegEye as FaEye } from "react-icons/fa";

const PhotoCard = ({ title, image, categories }) => {
    return (
        <div className={photoCardStyle.dataCard}>

            <figure>
                <img src={image} alt={title} />
            </figure>

            <div className={`${photoCardStyle.dataCardBody} text-center`}>
                <h2>{title}</h2>

                <div className={`${photoCardStyle.badgeContainer} d-flex align-items-center justify-content-center`}>
                    {categories.map(({ id, label, color }) =>
                        <div key={`category-${id}`}>
                            <span className='badge me-2' style={{ backgroundColor: color }} >{label}</span>
                        </div>
                    )}
                </div>
                <div className='d-flex justify-content-center'>
                    <button className={photoCardStyle.dataBtn}><FaEye />Vedi</button>
                </div>
            </div>

        </div >
    )
}

export default PhotoCard;