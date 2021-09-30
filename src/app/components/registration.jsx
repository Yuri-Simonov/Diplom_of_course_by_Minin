import React from "react";

const Registration = () => {
  return (
    <main class="shop authorization">
      <div class="container">
        <section class="authorization__body">
          <h2 class="authorization__title title">Регистрация</h2>
          <form action="#" class="authorization__form">
            <input
              type="text"
              class="authorization__login"
              placeholder="Логин"
            />
            <input
              type="password"
              class="authorization__password"
              placeholder="Пароль"
            />
            <input
              type="submit"
              class="authorization__submit"
              value="Зарегистрироваться"
            />
          </form>
        </section>
      </div>
    </main>
  );
};

export default Registration;
