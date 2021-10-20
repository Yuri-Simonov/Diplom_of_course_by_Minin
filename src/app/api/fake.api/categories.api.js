const categories = [
    "Обувь",
    "Одежда",
    "Головные уборы",
    "Спортивный инвентарь",
    "Продукты",
    "Детское питание",
    "Молочная продукция",
    "Спортивное питание"
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(categories);
        }, 2000);
    });

export default {
    fetchAll
};
