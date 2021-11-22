import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const Header = ({ foundFavoriteProducts, totalBasketCountArray }) => {
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
                                <span className="header__count-favorites">
                                    {foundFavoriteProducts.length}
                                </span>
                            </li>
                            <li>
                                <Link to="/basket" className="header__link">
                                    Корзина
                                </Link>
                                {totalBasketCountArray &&
                                    totalBasketCountArray.length > 0 && (
                                        <span className="header__count-basket">
                                            {totalBasketCountArray.length}
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
