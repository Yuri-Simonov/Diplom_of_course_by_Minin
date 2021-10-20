import React, { useEffect, useState } from "react";
import CategoryItem from "./category__item";
import api from "../../../api/index";

const Category = ({ clearCategory, ...rest }) => {
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
                              <CategoryItem key={item} item={item} {...rest} />
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

export default Category;
