import React, { useEffect, useState } from "react";
import api from "../../../../api/index";
import PropTypes from "prop-types";

const Category = ({
    clearCategory,
    changeCategoryItems,
    selectedCategoryItem
}) => {
    useEffect(() => {
        api.categories.fetchAll().then((data) => {
            setCategoryItems(data);
        });
    }, []);

    const [categoryItems, setCategoryItems] = useState();
    const [categoryText, setCategoryText] = useState(false);

    const categoryParent = document.querySelector(".category");
    const overlay = document.querySelector(".overlay");
    const body = document.querySelector("body");

    const changeClasses = () => {
        categoryParent.classList.toggle("category-active");
        overlay.classList.toggle("overlay-active");
        body.classList.toggle("lock");
        setCategoryText((prevState) => !prevState);
    };

    return (
        <>
            <button
                className="category__open item-body__buy"
                onClick={changeClasses}
            >
                {categoryText ? "Закрыть" : "Открыть"} категории
            </button>
            <div className="overlay" onClick={changeClasses}></div>
            <article className="content__category category">
                <h2 className="category__title title">Категории:</h2>
                <div className="category__items">
                    {categoryItems
                        ? categoryItems.map((item) => {
                              return (
                                  <button
                                      key={item}
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
        </>
    );
};
Category.propTypes = {
    clearCategory: PropTypes.func.isRequired,
    changeCategoryItems: PropTypes.func.isRequired,
    selectedCategoryItem: PropTypes.string
};

export default Category;
