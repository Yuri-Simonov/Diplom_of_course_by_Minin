import React, { useState, useEffect } from "react";
import api from "../../../../api/index";
import PropTypes from "prop-types";

const Sort = ({ onSort, currentSort }) => {
    const [sortItems, setSortItems] = useState();
    useEffect(() => {
        api.sorts.fetchAll().then((data) => {
            setSortItems(data);
        });
    }, []);

    // сортировка=========================================================================
    const handleSort = (event, item) => {
        const allTar = document.querySelectorAll(".sort__item");
        const tar = event.target;
        const classesOfTargetItem =
            "sort__item-active" || "sort__item-active-rotate";
        if (tar.classList.contains(classesOfTargetItem)) {
            allTar.forEach((item) => {
                item.classList.remove("sort__item-active");
                item.classList.remove("sort__item-active-rotate");
                tar.classList.add("sort__item-active-rotate");
            });
        } else {
            allTar.forEach((item) => {
                item.classList.remove("sort__item-active");
                item.classList.remove("sort__item-active-rotate");
            });
            tar.classList.toggle("sort__item-active");
        }
        if (item === currentSort.iter) {
            onSort({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    return (
        <div className="content__sort sort">
            <h2 className="sort__title title">Сортировать по:</h2>
            <div className="sort__items">
                {sortItems
                    ? Object.keys(sortItems).map((item) => {
                          return (
                              <p
                                  key={item}
                                  onClick={(event) => handleSort(event, item)}
                                  className="sort__item hover"
                              >
                                  {sortItems[item]}
                              </p>
                          );
                      })
                    : "Идет загрузка..."}
            </div>
        </div>
    );
};
Sort.propTypes = {
    itemName: PropTypes.string,
    itemKey: PropTypes.string,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};

export default Sort;
