import { Link, useNavigate } from 'react-router-dom';
import CategoryCard from '../../components/Cards/CategoryCard';
import { useAuth } from '../../contexts/AuthContext';
import { FaPlus as Plus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosClient.js'
import Modal from '../../components/Modal/Modal.jsx';

const CategoriesIndex = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState();

    const fetchCategories = async () => {
        const res = await axios.get('/categories');
        const newCategories = res.data;
        setCategories(newCategories);
    }

    const deleteSlug = (slug) => {
        setDeleteMode(true);
        const category = categories.filter(category => category.slug === slug);
        setCategoryToDelete(category);
    }

    const deleteCategory = async () => {
        const res = await axios.delete(`/categories/${categoryToDelete[0].slug}`);

        fetchCategories();

        setDeleteMode(false);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <section className="container">

            <div className={user.isAdmin ? "d-flex align-items-center justify-content-between" : ""}>
                <h1 className="text-center mb-4">Categorie</h1>
                {user.isAdmin && <Link to={'/categories/create'} className="btn btn-success d-flex align-items-center gap-1"><Plus />Crea</Link>}
            </div>

            <div className="row mt-1 g-4">
                {categories?.map(({ id, label, color, slug }) => (
                    <div key={`category-${id}`} className="col-3">

                        <CategoryCard
                            onDelete={deleteSlug}
                            label={label}
                            color={color}
                            slug={slug}
                        />

                    </div>
                ))}
            </div>

            {deleteMode &&
                <Modal
                    isShow={deleteMode}
                    closeModal={() => setDeleteMode(false)}
                    category={categoryToDelete}
                    userLogged={user}
                    deleteMode={true}
                    clickDelete={deleteCategory}
                    deleteCategory={true}
                />}

        </section>
    )
}

export default CategoriesIndex;