import React from "react";
import CategoryItem from "./category__item";

const Category = () => {
    const categoryItems = [
        "Обувь",
        "Одежда",
        "Головные уборы",
        "Спортивный инвентарь",
        "Продукты",
        "Детское питание",
        "Молочная продукция",
        "Спортивное питание"
    ];

    return (
        <article className="content__category category">
            <h2 className="category__title title">Категории:</h2>
            <div className="category__items">
                {categoryItems.map((item) => {
                    return <CategoryItem key={item} item={item} />;
                })}
            </div>
            <div className="category__reset">Сбросить фильтр</div>
        </article>
    );
};

export default Category;
