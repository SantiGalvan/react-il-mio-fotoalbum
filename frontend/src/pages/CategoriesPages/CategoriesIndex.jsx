import { useGlobal } from '../../contexts/GlobalContext';

const CategoriesIndex = () => {

    const { categories } = useGlobal();

    return (
        <section className="container">
            <h1 className="text-center">Categorie</h1>
            <div className="row my-4">
                {categories?.map(({ id, label, color }) => (
                    <div key={`category-${id}`} className="col-2">{label}</div>
                ))}
            </div>
        </section>
    )
}

export default CategoriesIndex;