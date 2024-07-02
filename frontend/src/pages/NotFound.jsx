import notFound from '../assets/img/notfound.png';

const NotFound = () => {
    return (
        <section className="container">
            <div className="card p-4 w-50 m-auto">
                <figure className='mb-0 notfound-container'>
                    <img src={notFound} alt="Not Found" className='img-fluid' />
                </figure>
                <h1 className='text-center mt-4'>404 - Not Found</h1>
            </div>
        </section>
    )
}

export default NotFound;