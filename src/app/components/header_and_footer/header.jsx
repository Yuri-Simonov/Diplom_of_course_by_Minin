import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useFavorite } from "../../hooks/useFavorite";
import { useBasket } from "../../hooks/useBasket";
import { useWindowSize } from "../../hooks/useSize";

const Header = () => {
    const { foundFavoriteProducts } = useFavorite();
    const { totalBasketCountArray } = useBasket();
    const [width] = useWindowSize();

    // вывод итогового количества товаров в корзине
    const totalBaksetProducts = JSON.parse(
        localStorage.getItem("productsForBasket")
    );
    let totalSumBaksetProducts = 0;
    totalBaksetProducts &&
        totalBaksetProducts.forEach((element) => {
            totalSumBaksetProducts += element.value;
        });

    // Menu burger =======================================================================
    const headerBurger = document.querySelector(".header__burger");
    const headerMenu = document.querySelector(".header__menu");
    const body = document.querySelector("body");
    const toggleBurger = () => {
        headerBurger.classList.toggle("active");
        headerMenu.classList.toggle("active");
        body.classList.toggle("lock");
    };
    useEffect(() => {
        if (width >= 768 && headerBurger && headerMenu) {
            console.log(1);
            headerBurger.classList.remove("active");
            headerMenu.classList.remove("active");
            body.classList.remove("lock");
        }
    }, [width]);
    // =======================================================================

    return (
        <div className="header">
            <div className="container">
                <div className="header__body">
                    <div className="header__logo">LOGO</div>
                    <div className="header__burger" onClick={toggleBurger}>
                        <span></span>
                    </div>
                    <nav className="header__menu">
                        <ul className="header__list">
                            <li onClick={toggleBurger}>
                                <Link to="/products" className="header__link">
                                    Главная
                                </Link>
                            </li>
                            <li onClick={toggleBurger}>
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
                            <li onClick={toggleBurger}>
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
                            <li onClick={toggleBurger}>
                                <Link
                                    to="/authorization"
                                    className="header__button"
                                >
                                    Вход / Регистрация
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};
Header.propTypes = {
    foundFavoriteProducts: PropTypes.array,
    totalBasketCountArray: PropTypes.array
};

export default Header;
