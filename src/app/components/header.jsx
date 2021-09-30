import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
                <Link to="/main-page" className="header__link">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="#" className="header__link">
                  Избранное
                </Link>
              </li>
              <li>
                <Link to="/basket" className="header__link">
                  Корзина
                </Link>
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

export default Header;
