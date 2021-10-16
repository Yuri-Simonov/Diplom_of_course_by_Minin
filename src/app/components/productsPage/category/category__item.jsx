import React from "react";
import propTypes from "prop-types";

const CategoryItem = ({ item }) => {
    return <button className="category__item hover">{item}</button>;
};
CategoryItem.propTypes = {
    item: propTypes.string.isRequired
};

export default CategoryItem;
