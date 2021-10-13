import React from "react";
import SortItem from "./sort__item";

const Sort = () => {
    const sortItems = [
        "Цена",
        "Производитель",
        "Срок доставки",
        "Рейтинг товара",
        "Количество отзывов"
    ];

    return (
        <div className="content__sort sort">
            <h2 className="sort__title title">Сортировать по:</h2>
            <div className="sort__items">
                {sortItems.map((item) => {
                    return <SortItem key={item} item={item} />;
                })}
            </div>
        </div>
    );
};

export default Sort;
