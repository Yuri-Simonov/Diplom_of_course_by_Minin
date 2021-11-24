import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/header_and_footer/header";
import Authorization from "./components/auth_and_registration/authorization";
import Registration from "./components/auth_and_registration/registration";
import Footer from "./components/header_and_footer/footer";
import { Route, Switch, Redirect } from "react-router-dom";
import Basket from "./components/basketPage/basket";
import api from "./api";
import Products from "./components/products/products";
import PageNotFound from "./components/404/page-404";
import FavoritesPage from "./components/favoritesPage/favoritesPage";

const App = () => {
    //появление продуктов через 2 секунды===============================================
    const [products, setProducts] = useState();
    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    }, []);

    //сортировка=========================================================================
    const [sortBy, setSortBy] = useState({ iter: "", order: "" });
    const onSort = (item) => {
        setSortBy(item);
    };

    //добавление товара в корзину (хедер)===============================================
    const [totalBasketCountArray, setTotalBasketCountArray] = useState([]);
    const [totalNumberBasketProducts, setTotalNumberBasketProducts] =
        useState(0);

    //функция, фильтрующая товары для массива корзины
    const changeAmountOfBasketProducts = (productItem) => {
        setTotalNumberBasketProducts((prevState) => prevState + 1);
        localStorage.setItem(
            `productBasket-${productItem._id}`,
            JSON.stringify(productItem)
        );
        let timeArrOfBusketProducts = [];
        products.filter((product) => {
            if (localStorage.getItem(`productBasket-${product._id}`)) {
                return timeArrOfBusketProducts.push(
                    JSON.parse(
                        localStorage.getItem(`productBasket-${product._id}`)
                    )
                );
            }
        });
        localStorage.setItem(
            "productsForBasket",
            JSON.stringify(timeArrOfBusketProducts)
        );
    };

    //добавление товаров в корзину
    const addItemToBasket = (product) => {
        let localFoundProductInBasket;
        if (localStorage.getItem(`productBasket-${product._id}`)) {
            localFoundProductInBasket = JSON.parse(
                localStorage.getItem(`productBasket-${product._id}`)
            );
            localFoundProductInBasket.value++;
            changeAmountOfBasketProducts(localFoundProductInBasket);
        } else {
            changeAmountOfBasketProducts(product);
        }
    };

    useEffect(() => {
        setTotalBasketCountArray(
            JSON.parse(localStorage.getItem("productsForBasket"))
        );
    }, [totalNumberBasketProducts]);

    //удаление товаров из корзины
    const deleteBasketItem = (basketItem) => {
        if (localStorage.getItem(`productBasket-${basketItem._id}`)) {
            localStorage.removeItem(`productBasket-${basketItem._id}`);
            setTotalNumberBasketProducts((prevState) => prevState - 1);
            let beforeDeleteBasketItem = JSON.parse(
                localStorage.getItem("productsForBasket")
            );
            let afterDeleteBasketItem = beforeDeleteBasketItem.filter(
                (item) => {
                    return item._id !== basketItem._id;
                }
            );
            localStorage.setItem(
                "productsForBasket",
                JSON.stringify(afterDeleteBasketItem)
            );
        }
    };
    //===================================================================================

    //добавление товара в избранное (хедер)===============================================
    const [foundFavoriteProducts, setFoundFavoriteProducts] = useState([]);
    const [totalNumberFavoriteProducts, setTotalNumberFavoriteProducts] =
        useState(0);

    const addItemToFavorites = (event, product) => {
        const nearFavoriteParent = event.target.closest(".product__favorites");
        if (
            nearFavoriteParent.classList.contains("product__favorites-active")
        ) {
            nearFavoriteParent.classList.toggle("product__favorites-active");
        } else {
            nearFavoriteParent.classList.toggle("product__favorites-active");
        }

        if (localStorage.getItem(`product-${product._id}`)) {
            setTotalNumberFavoriteProducts((prevState) => prevState - 1);
            localStorage.removeItem(`product-${product._id}`);
            changeAmountOfFavoriteProducts();
        } else {
            setTotalNumberFavoriteProducts((prevState) => prevState + 1);
            localStorage.setItem(
                `product-${product._id}`,
                JSON.stringify(product)
            );

            changeAmountOfFavoriteProducts();
        }
    };

    const changeAmountOfFavoriteProducts = () => {
        let timeArrOfFavoriteProducts = [];
        products.filter((product) => {
            if (localStorage.getItem(`product-${product._id}`)) {
                return timeArrOfFavoriteProducts.push(
                    JSON.parse(localStorage.getItem(`product-${product._id}`))
                );
            }
        });
        localStorage.setItem(
            "productsFavorite",
            JSON.stringify(timeArrOfFavoriteProducts)
        );
        setFoundFavoriteProducts(
            JSON.parse(localStorage.getItem("productsFavorite"))
        );
    };

    useEffect(() => {
        setFoundFavoriteProducts(
            JSON.parse(localStorage.getItem("productsFavorite"))
        );
    }, [totalNumberFavoriteProducts]);
    //===================================================================================

    return (
        <div className="wrapper">
            <Header
                foundFavoriteProducts={foundFavoriteProducts}
                totalBasketCountArray={totalBasketCountArray}
            />
            <Switch>
                <Route path="/registration" component={Registration} />
                <Route
                    path="/basket"
                    render={(props) => (
                        <Basket
                            deleteBasketItem={deleteBasketItem}
                            {...props}
                        />
                    )}
                />
                <Route
                    path="/favorites"
                    render={(props) => (
                        <FavoritesPage
                            products={products}
                            foundFavoriteProducts={foundFavoriteProducts}
                            addItemToBasket={addItemToBasket}
                            addItemToFavorites={addItemToFavorites}
                            {...props}
                        />
                    )}
                />
                <Route
                    path="/products/:productId?"
                    render={(props) => (
                        <Products
                            products={products}
                            addItemToBasket={addItemToBasket}
                            addItemToFavorites={addItemToFavorites}
                            sortBy={sortBy}
                            onSort={onSort}
                            {...props}
                        />
                    )}
                />
                <Route path="/404" component={PageNotFound} />
                <Route path="/" exact component={Authorization} />
                <Redirect from="/authorization" to="/" />
                <Redirect to="/404" />
            </Switch>
            <Footer />
        </div>
    );
};

export default App;
