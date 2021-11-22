const products = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        value: 1,
        name: "Доширак",
        taste: "со вкусом курицы",
        rating: 4.8,
        price: 39,
        reviews: 379,
        imgSrc: "/img/doshik.jpg",
        category: "Продукты"
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        value: 1,
        name: "Роллтон",
        taste: "со вкусом грибов",
        rating: 4.5,
        price: 23,
        reviews: 231,
        imgSrc: "/img/rollton.jpg",
        category: "Продукты"
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        value: 1,
        name: "Молоко",
        taste: "топлёное",
        rating: 4.4,
        price: 71,
        reviews: 12,
        imgSrc: "/img/milk.jpg",
        category: "Молочная продукция"
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        value: 1,
        name: "Шлёпки",
        taste: "неубиваемые",
        rating: 4.9,
        price: 300,
        reviews: 999,
        imgSrc: "/img/shlepki.jpg",
        category: "Обувь"
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        value: 1,
        name: "Куртка",
        taste: "кожаная",
        rating: 4.0,
        price: 3500,
        reviews: 9,
        imgSrc: "/img/kurtka.jpg",
        category: "Одежда"
    },
    {
        _id: "67rdca3eeb7f6fgeed471820",
        value: 1,
        name: "Кепка",
        taste: "",
        rating: 3.8,
        price: 500,
        reviews: 76,
        imgSrc: "/img/kepka.jpg",
        category: "Головные уборы"
    },
    {
        _id: "67rdca3eeb7f6fgeed471821",
        value: 1,
        name: "Беговая дорожка",
        taste: "",
        rating: 4.1,
        price: 21000,
        reviews: 0,
        imgSrc: "/img/velosiped.jpg",
        category: "Спортивный инвентарь"
    },
    {
        _id: "67rdca3eeb7f6fgeed471822",
        value: 1,
        name: "Ростишка",
        taste: "со вкусом клубники",
        rating: 3.6,
        price: 34,
        reviews: 5,
        imgSrc: "/img/rastishka-klubnika.jpg",
        category: "Детское питание"
    },
    {
        _id: "67rdca3eeb7f6fgeed471823",
        value: 1,
        name: "Ростишка",
        taste: "со вкусом банана",
        rating: 3.8,
        price: 35,
        reviews: 12,
        imgSrc: "/img/rastishka-banan.jpg",
        category: "Детское питание"
    },
    {
        _id: "67rdca3eeb7f6fgeed471824",
        value: 1,
        name: "Протеин",
        taste: "со вкусом карамели",
        rating: 4.8,
        price: 1280,
        reviews: 38,
        imgSrc: "/img/protein.jpg",
        category: "Спортивное питание"
    },
    {
        _id: "67rdca3eeb7f6fgeed471825",
        value: 1,
        name: "Кефир",
        taste: "",
        rating: 4.2,
        price: 79,
        reviews: 34,
        imgSrc: "/img/kefir.jpg",
        category: "Молочная продукция"
    }
];

if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("products")));
        }, 1000);
    });
const update = (id, data) =>
    new Promise((resolve) => {
        const products = JSON.parse(localStorage.getItem("products"));
        const productIndex = products.findIndex((u) => u._id === id);
        products[productIndex] = { ...products[productIndex], ...data };
        localStorage.setItem("products", JSON.stringify(products));
        resolve(products[productIndex]);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("products")).find(
                    (product) => product._id === id
                )
            );
        }, 1000);
    });
export default {
    fetchAll,
    getById,
    update
};
/* eslint-disable no-new */
