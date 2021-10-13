const products = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Доширак",
        taste: "со вкусом курицы",
        rating: "4.8",
        price: "39",
        reviews: "379",
        imgSrc: "img/doshik.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        name: "Роллтон",
        taste: "со вкусом грибов",
        rating: "4.5",
        price: "23",
        reviews: "231",
        imgSrc: "img/rollton.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        name: "Молоко",
        taste: "топлёное",
        rating: "4.4",
        price: "71",
        reviews: "12",
        imgSrc: "img/milk.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        name: "Шлёпки",
        taste: "неубиваемые",
        rating: "4.9",
        price: "300",
        reviews: "999",
        imgSrc: "img/shlepki.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        name: "Куртка",
        taste: "кожаная",
        rating: "4.0",
        price: "3500",
        reviews: "9",
        imgSrc: "img/kurtka.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471820",
        name: "Кепка",
        taste: "",
        rating: "3.8",
        price: "500",
        reviews: "76",
        imgSrc: "img/doshik.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471821",
        name: "Беговая дорожка",
        taste: "",
        rating: "4.1",
        price: "100",
        reviews: "0",
        imgSrc: "img/velosiped.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471822",
        name: "Ростишка",
        taste: "со вкусом клубники",
        rating: "3.6",
        price: "34",
        reviews: "5",
        imgSrc: "img/rastishka-klubnika.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471823",
        name: "Ростишка",
        taste: "со вкусом банана",
        rating: "3.8",
        price: "35",
        reviews: "12",
        imgSrc: "img/rastishka-banan.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471824",
        name: "Протеин",
        taste: "со вкусом карамели",
        rating: "4.8",
        price: "1280",
        reviews: "38",
        imgSrc: "img/protein.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471825",
        name: "Кефир",
        taste: "",
        rating: "4.2",
        price: "79",
        reviews: "34",
        imgSrc: "img/kefir.jpg"
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(products);
        }, 2000);
    });

/* eslint-disable no-new */
/* const getById = (id) => {
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(products.find((product) => product._id === id));
        });
    });
}; */

export default {
    fetchAll
    /* getById */
};
