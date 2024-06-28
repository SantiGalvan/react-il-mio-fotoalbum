import categoryCardStyle from './CategoryCard.module.scss';
import { BsFillPencilFill as Pencil } from "react-icons/bs";
import { FaRegTrashCan as Trash } from "react-icons/fa6";

const CategoryCard = ({ label, color, onDelete, slug }) => {
    return (
        <div className={`${categoryCardStyle.card} card`} style={{ backgroundColor: color }}>
            <div className={categoryCardStyle.title}>
                <h1 className='text-center'>{label}</h1>
            </div>
            <div className='d-flex justify-content-center gap-2'>

                <button
                    className={`${categoryCardStyle.btn} btn btn-sm btn-warning`}>
                    <Pencil />Modifica
                </button>

                <button
                    onClick={() => onDelete(slug)}
                    className={`${categoryCardStyle.btn} btn btn-sm btn-danger`}>
                    <Trash />Elimina
                </button>

            </div>
        </div>
    )
}

export default CategoryCard;