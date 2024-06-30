const Pagination = ({ totalPages, currentPage, buttonClick }) => {

    const elements = [];

    for (let i = 0; i < totalPages; i++) {
        elements.push(i + 1);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">

                <li className="page-item">
                    <button
                        onClick={() => buttonClick('prev')}
                        className={`page-link ${currentPage - 1 > 0 ? '' : 'disabled'}`}>
                        Prev
                    </button>
                </li>

                {elements.map((element, index) => (
                    <li key={`element-${index}`} className="page-item">
                        <button
                            onClick={() => buttonClick(null, element)}
                            className={`page-link ${currentPage === element ? 'active' : ''}`}>
                            {element}
                        </button>
                    </li>
                ))}

                <li className="page-item">
                    <button
                        onClick={() => buttonClick('next')}
                        className={`page-link ${currentPage >= totalPages ? 'disabled' : ''}`}>
                        Next
                    </button>
                </li>

            </ul>
        </nav>
    )
}

export default Pagination;