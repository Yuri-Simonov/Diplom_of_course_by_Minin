import React, { useState, useEffect } from "react";
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
    const [basketCount, setBasketCount] = useState(0);
    const addItemToBasket = () => {
        setBasketCount(basketCount + 1);
    };

    useEffect(() => {
        const basketNumber = document.querySelector(".header__count-basket");
        basketNumber.textContent = basketCount;
        if (basketNumber.textContent === "0") {
            basketNumber.style.display = "none";
        } else {
            basketNumber.style.display = "inline-block";
        }
    });
    //===================================================================================

    //добавление товара в избранное (хедер)===============================================
    const [favoritesCount, setFavoritesCount] = useState(0);
    const [foundFavoriteProducts, setFoundFavoriteProducts] = useState([]);

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
            localStorage.removeItem(`product-${product._id}`);
            changeAmountOfFavoriteProducts();
        } else {
            localStorage.setItem(
                `product-${product._id}`,
                JSON.stringify(product)
            );

            changeAmountOfFavoriteProducts();
        }
    };
    useEffect(() => {
        setFavoritesCount(foundFavoriteProducts.length);
    }, [foundFavoriteProducts]);

    const changeAmountOfFavoriteProducts = () => {
        setFoundFavoriteProducts(
            products.filter((product) => {
                return (
                    JSON.stringify(product) ===
                    localStorage.getItem(`product-${product._id}`)
                );
            })
        );
    };

    useEffect(() => {
        const favoritesNumber = document.querySelector(
            ".header__count-favorites"
        );
        favoritesNumber.textContent = favoritesCount;
        if (favoritesNumber.textContent === "0") {
            favoritesNumber.style.display = "none";
        } else {
            favoritesNumber.style.display = "inline-block";
        }
    });
    //===================================================================================

    return (
        <div className="wrapper">
            <Header basketCount={basketCount} favoritesCount={favoritesCount} />
            <Switch>
                <Route path="/registration" component={Registration} />
                <Route path="/basket" component={Basket} />
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
