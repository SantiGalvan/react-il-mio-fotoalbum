import { Link } from 'react-router-dom';
import CategoryCard from '../../components/Cards/CategoryCard';
import { useAuth } from '../../contexts/AuthContext';
import { FaPlus as Plus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosClient.js'

const CategoriesIndex = () => {

    const { user } = useAuth();

    const [categories, setCategories] = useState();

    const fetchCategories = async () => {
        const res = await axios.get('/categories');
        const newCategories = res.data;
        setCategories(newCategories);
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <section className="container">

            <div className={user.isAdmin ? "d-flex align-items-center justify-content-between" : ""}>
                <h1 className="text-center mb-4">Categorie</h1>
                {user.isAdmin && <Link to={'/categories/create'} className="btn btn-success d-flex align-items-center gap-1"><Plus />Crea</Link>}
            </div>

            <div className="row mt-1 g-4">
                {categories?.map(({ id, label, color }) => (
                    <div key={`category-${id}`} className="col-3">
                        <CategoryCard label={label} color={color} />
                    </div>
                ))}
            </div>

        </section>
    )
}

export default CategoriesIndex;