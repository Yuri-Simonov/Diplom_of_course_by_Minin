const sorts = {
    price: "Цена",
    name: "Название",
    rating: "Рейтинг товара",
    reviews: "Количество отзывов"
};

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(sorts);
        }, 1000);
    });

export default {
    fetchAll
};
