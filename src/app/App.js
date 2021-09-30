import React from "react";
import Header from "./components/header";
import Authorization from "./components/authorization";
import Registration from "./components/registration";
import Footer from "./components/footer";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/main-page";
import Basket from "./components/basket";
import Product from "./components/product";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route path="/" exact component={Authorization} />
        <Route path="/registration" component={Registration} />
        <Route path="/basket" component={Basket} />
        <Route path="/main-page/product" component={Product} />
        <Route path="/main-page" component={MainPage} />
        <Redirect from="/authorization" to="/" />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
