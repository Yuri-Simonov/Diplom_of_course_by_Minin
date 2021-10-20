import React from "react";
import propTypes from "prop-types";

const CategoryItem = ({ item, changeCategoryItems, selectedCategoryItem }) => {
    return (
        <button
            className={
                "category__item hover" +
                (item === selectedCategoryItem ? " category__item-active" : "")
            }
            onClick={() => changeCategoryItems(item)}
        >
            {item}
        </button>
    );
};
CategoryItem.propTypes = {
    item: propTypes.string.isRequired,
    changeCategoryItems: propTypes.func.isRequired,
    selectedCategoryItem: propTypes.string
};

export default CategoryItem;
