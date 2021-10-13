import React, { useState, useEffect } from 'react';
import Header from "./components/header_and_footer/header";
import Authorization from "./components/auth_and_registration/authorization";
import Registration from "./components/auth_and_registration/registration";
import Footer from "./components/header_and_footer/footer";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductsPage from "./components/productsPage/products";
import Basket from "./components/basket/basket";
import Product from "./components/productPage/product";

const App = () => {

	//добавление товара в корзину (хедер)===============================================
	const [basketCount, setBasketCount] = useState(0);
	const addItemToBasket = () => {
		console.log(1);
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
	const addItemToFavorites = (event) => {
		const nearFavoriteParent = event.target.closest(".product__favorites");
		if (
			nearFavoriteParent.classList.contains("product__favorites-active")
		) {
			nearFavoriteParent.classList.toggle("product__favorites-active");
			setFavoritesCount(favoritesCount - 1);
		} else {
			nearFavoriteParent.classList.toggle("product__favorites-active");
			setFavoritesCount(favoritesCount + 1);
		}
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
				<Route path="/" exact component={Authorization} />
				<Route path="/registration" component={Registration} />
				<Route path="/basket" component={Basket} />
				<Route path="/products/product" component={Product} />
				<Route path="/products" render={() => <ProductsPage addItemToBasket={addItemToBasket} addItemToFavorites={addItemToFavorites} />} />
				<Redirect from="/authorization" to="/" />
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
