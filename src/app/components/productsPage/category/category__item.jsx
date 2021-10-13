import React from "react";

const CategoryItem = ({ item }) => {
    return (
        <a href="#" className="category__item hover">
            {item}
        </a>
    );
};

export default CategoryItem;
