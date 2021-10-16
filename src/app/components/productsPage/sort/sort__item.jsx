import React from "react";
import propTypes from "prop-types";

const SortItem = ({ item }) => {
    const clickSortItem = (event) => {
        const tar = event.target;
        tar.classList.toggle("sort__item-active");
    };

    return (
        <p
            onClick={(event) => clickSortItem(event)}
            className="sort__item hover"
        >
            {item}
        </p>
    );
};
SortItem.propTypes = {
    item: propTypes.string.isRequired
};

export default SortItem;
