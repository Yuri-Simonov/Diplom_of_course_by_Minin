import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { useFavorite } from "../../hooks/useFavorite";
import { useBasket } from "../../hooks/useBasket";

const Header = () => {
    const { foundFavoriteProducts } = useFavorite();
    const { totalBasketCountArray } = useBasket();

    //вывод итогового количества товаров в корзине
    const totalBaksetProducts = JSON.parse(
        localStorage.getItem("productsForBasket")
    );
    let totalSumBaksetProducts = 0;
    totalBaksetProducts &&
        totalBaksetProducts.forEach((element) => {
            totalSumBaksetProducts += element.value;
        });

    return (
        <div className="header">
            <div className="container">
                <div className="header__body">
                    <div className="header__logo">LOGO</div>
                    <div className="header__burger">
                        <span></span>
                    </div>
                    <nav className="header__menu">
                        <ul className="header__list">
                            <li>
                                <Link to="/products" className="header__link">
                                    Главная
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="header__link">
                                    Избранное
                                </Link>
                                {foundFavoriteProducts &&
                                    foundFavoriteProducts.length > 0 && (
                                        <span className="header__count-favorites">
                                            {foundFavoriteProducts.length}
                                        </span>
                                    )}
                            </li>
                            <li>
                                <Link to="/basket" className="header__link">
                                    Корзина
                                </Link>
                                {totalBasketCountArray &&
                                    totalBasketCountArray.length > 0 && (
                                        <span className="header__count-basket">
                                            {totalSumBaksetProducts}
                                        </span>
                                    )}
                            </li>
                        </ul>
                    </nav>
                    <Link to="/authorization" className="header__button">
                        Вход / Регистрация
                    </Link>
                </div>
            </div>
        </div>
    );
};
Header.propTypes = {
    foundFavoriteProducts: propTypes.array,
    totalBasketCountArray: propTypes.array
};

export default Header;
