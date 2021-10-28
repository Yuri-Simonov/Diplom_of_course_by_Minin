import React, { useEffect, useState } from "react";
import api from "../../../api/index";
import propTypes from "prop-types";

const Category = ({
    clearCategory,
    changeCategoryItems,
    selectedCategoryItem
}) => {
    const [categoryItems, setCategoryItems] = useState();
    useEffect(() => {
        api.categories.fetchAll().then((data) => {
            setCategoryItems(data);
        });
    }, []);

    return (
        <article className="content__category category">
            <h2 className="category__title title">Категории:</h2>
            <div className="category__items">
                {categoryItems
                    ? categoryItems.map((item) => {
                          return (
                              <button
                                  className={
                                      "category__item hover" +
                                      (item === selectedCategoryItem
                                          ? " category__item-active"
                                          : "")
                                  }
                                  onClick={() => changeCategoryItems(item)}
                              >
                                  {item}
                              </button>
                          );
                      })
                    : "Загрузка..."}
            </div>
            <div className="category__reset" onClick={clearCategory}>
                Сбросить фильтр
            </div>
        </article>
    );
};
Category.propTypes = {
    clearCategory: propTypes.func.isRequired,
    changeCategoryItems: propTypes.func.isRequired,
    selectedCategoryItem: propTypes.string.isRequired
};

export default Category;
