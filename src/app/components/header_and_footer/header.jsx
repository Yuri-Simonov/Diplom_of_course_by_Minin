import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../../hooks/useBasket";
import { resizePage } from "../../../utils/resizePage";
import ProfileDropdown from "./profile_dropdown";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";
import { getFavouritesAmount } from "../../store/favourite";

const Header = () => {
    const foundFavoriteProductsAmount = useSelector(getFavouritesAmount());
    const { totalBasketCountArray } = useBasket();
    const currentUserId = useSelector(getCurrentUserId());
    const [width] = resizePage();

    // вывод итогового количества товаров в корзине
    let totalBaksetProducts = "";
    if (currentUserId) {
        totalBaksetProducts = JSON.parse(
            localStorage.getItem(`productsForBasket-${currentUserId}`)
        );
    }
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
        if (headerBurger) {
            headerBurger.classList.toggle("active");
            headerMenu.classList.toggle("active");
            body.classList.toggle("lock");
        }
    };
    useEffect(() => {
        if (width >= 768 && headerBurger && headerMenu) {
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
                                    Продукты
                                </Link>
                            </li>
                            {currentUserId && (
                                <li onClick={toggleBurger}>
                                    <Link
                                        to="/favorites"
                                        className="header__link"
                                    >
                                        Избранное
                                    </Link>
                                    {foundFavoriteProductsAmount > 0 && (
                                        <span className="header__count-favorites">
                                            {foundFavoriteProductsAmount}
                                        </span>
                                    )}
                                </li>
                            )}
                            {currentUserId && (
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
                            )}
                            {currentUserId ? (
                                <li onClick={toggleBurger}>
                                    <div>
                                        <ProfileDropdown
                                            userId={currentUserId}
                                        />
                                    </div>
                                </li>
                            ) : (
                                <li onClick={toggleBurger}>
                                    <Link
                                        to="/authorization"
                                        className="header__button"
                                    >
                                        Вход
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;
