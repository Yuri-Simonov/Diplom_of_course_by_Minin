import React from "react";
import _ from "lodash";

const Pagination = ({
    allAmountProducts,
    sizeOnePage,
    pageChange,
    currentPage
}) => {
    const pageNumbers = Math.ceil(allAmountProducts / sizeOnePage);
    if (pageNumbers === 1) {
        return null;
    }
    const pages = _.range(1, pageNumbers + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li
                            className={
                                "pagination__item" +
                                (page === currentPage ? "-active" : "")
                            }
                            key={page}
                        >
                            <a
                                className="pagination__link"
                                href="#"
                                onClick={() => pageChange(page)}
                            >
                                {page}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
