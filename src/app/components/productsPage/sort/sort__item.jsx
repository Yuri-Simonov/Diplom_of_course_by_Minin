import React from "react";

const SortItem = ({ item }) => {
    const click = (event) => {
        const tar = event.target;
        tar.classList.toggle("sort__item-active");
    };

    return (
        <p onClick={(event) => click(event)} className="sort__item hover">
            {item}
        </p>
    );
};

export default SortItem;
