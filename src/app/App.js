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
import Initialize from "./components/initialize/initialize";
import ProtectedRoute from "./components/protectedRoutes/protectedRoute";
import Profile from "./components/header_and_footer/profile";
import SignOut from "./components/auth_and_registration/sign_out";
import ProductsList from "./components/products/productsPage/productsList";
import AppLoader from "./components/hoc/appLoader";

const App = () => {
    return (
        <div className="wrapper">
            <AppLoader>
                <Header />
                <Switch>
                    <ProtectedRoute path="/basket" component={Basket} />
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/products/:productId?" component={Products} />
                    <ProtectedRoute
                        path="/profile/:profileId?/:edit?"
                        component={Profile}
                    />
                    <Route path="/404" component={PageNotFound} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/signout" component={SignOut} />
                    <Route
                        path="/authorization"
                        exact
                        component={Authorization}
                    />
                    <Route path="/" exact component={ProductsList} />
                    <Route path="/initialize" component={Initialize} />
                    <Redirect to="/404" />
                </Switch>
                <Footer />
            </AppLoader>
        </div>
    );
};

export default App;
