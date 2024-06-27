import CategoryCard from '../../components/Cards/CategoryCard';
import { useGlobal } from '../../contexts/GlobalContext';

const CategoriesIndex = () => {

    const { categories } = useGlobal();

    return (
        <section className="container">
            <h1 className="text-center">Categorie</h1>
            <div className="row my-2 g-4">
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