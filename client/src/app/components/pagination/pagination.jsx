import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

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
                            <button
                                className="pagination__link"
                                onClick={() => pageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    allAmountProducts: PropTypes.number.isRequired,
    sizeOnePage: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
