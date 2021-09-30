import React from "react";
import doshik from "../img/doshik.jpg";

const Basket = () => {
  return (
    <main class="shop">
      <div class="container">
        <section class="shop__search search">
          <form action="#" class="search__form">
            <input
              type="text"
              class="search__input"
              placeholder="Поиск товаров"
            />
            <input type="submit" class="search__submit" value="Искать" />
          </form>
        </section>
        <section class="shop__basket">
          <h2 class="shop__basket-title title">Корзина</h2>
          <div class="shop__basket-flex">
            <article class="shop__basket-column-left">
              <div class="basket-item">
                <div class="basket-item__column-left">
                  <img src={doshik} alt="doshik" />
                </div>
                <div class="basket-item__column-right">
                  <h2 class="basket-item__title title">Название товара</h2>
                  <div class="basket-item__id">id товара</div>
                  <div class="basket-item__amount">
                    <div class="item-body__amount">
                      <div class="item-body__amount-minus">-</div>
                      <div class="item-body__amount-number">1</div>
                      <div class="item-body__amount-plus">+</div>
                    </div>
                  </div>
                  <div class="basket-item__price">100 руб.</div>
                  <div class="basket-item__close-btn">x</div>
                </div>
              </div>
            </article>
            <article class="shop__basket-column-right">
              <div class="shop__basket__total-sum">Итого: 1000 руб.</div>
              <button class="shop__basket-final-btn item-body__buy">
                Оформить заказ
              </button>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Basket;
