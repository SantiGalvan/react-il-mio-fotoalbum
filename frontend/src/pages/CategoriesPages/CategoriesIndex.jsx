import { useGlobal } from '../../contexts/GlobalContext';

const CategoriesIndex = () => {

    const { categories } = useGlobal();

    console.log(categories);

    return (
        <section className="container">
            <h1 className="text-center">Categorie</h1>
            <div className="row">
                {categories?.map(({ id, label, color }) => (
                    <div key={`category-${id}`} className="col-3">{label}</div>
                ))}
            </div>
        </section>
    )
}

export default CategoriesIndex;