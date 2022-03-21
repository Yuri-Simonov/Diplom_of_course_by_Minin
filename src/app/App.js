import React from "react";
import Header from "./components/header_and_footer/header";
import Authorization from "./components/auth_and_registration/authorization";
import Registration from "./components/auth_and_registration/registration";
import Footer from "./components/header_and_footer/footer";
import { Route, Switch, Redirect } from "react-router-dom";
import Basket from "./components/basketPage/basket";
import Products from "./components/products/products";
import PageNotFound from "./components/404/page-404";
import FavoritesPage from "./components/favoritesPage/favoritesPage";
import BasketProvider from "./hooks/useBasket";
import FavoriteProvider from "./hooks/useFavorite";
import ProductsProvider from "./hooks/useProducts";

const App = () => {
    return (
        <div className="wrapper">
            <ProductsProvider>
                <BasketProvider>
                    <FavoriteProvider>
                        <Header />
                        <Switch>
                            <Route
                                path="/registration"
                                component={Registration}
                            />
                            <Route path="/basket" component={Basket} />
                            <Route
                                path="/favorites"
                                component={FavoritesPage}
                            />
                            <Route
                                path="/products/:productId?"
                                component={Products}
                            />
                            <Route path="/404" component={PageNotFound} />
                            <Route path="/" exact component={Authorization} />
                            <Redirect from="/authorization" to="/" />
                            <Redirect to="/404" />
                        </Switch>
                    </FavoriteProvider>
                </BasketProvider>
            </ProductsProvider>
            <Footer />
        </div>
    );
};

export default App;
