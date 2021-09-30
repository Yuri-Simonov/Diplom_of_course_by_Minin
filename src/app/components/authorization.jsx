import React from "react";
import { Link } from "react-router-dom";

const Authorization = () => {
  return (
    <>
      <main className="shop authorization">
        <div className="container">
          <section className="authorization__body">
            <h2 className="authorization__title title">Вход</h2>
            <form action="#" className="authorization__form">
              <input
                type="text"
                className="authorization__login"
                placeholder="Логин"
              />
              <input
                type="password"
                className="authorization__password"
                placeholder="Пароль"
              />
              <input
                type="submit"
                className="authorization__submit"
                value="Войти"
              />
            </form>
            <Link
              to="/registration"
              className="authorization__registration hover"
            >
              Зарегистрироваться
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default Authorization;
