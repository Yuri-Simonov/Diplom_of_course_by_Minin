import React from "react";
import doshik from "../img/doshik.jpg";

const Product = () => {
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
        <section class="shop__item">
          <h3 class="shop__item__breadcrumbs"></h3>
          <div class="shop__item-body item-body">
            <div class="item-body__flex">
              <div class="item-body__column-left">
                <img src={doshik} alt="doshik" />
              </div>
              <div class="item-body__column-right">
                <h2 class="item-body__title title">Название товара</h2>
                <div class="item-body__amount">
                  <div class="item-body__amount-minus">-</div>
                  <div class="item-body__amount-number">1</div>
                  <div class="item-body__amount-plus">+</div>
                </div>
                <div class="item-body__id">id товара</div>
                <div class="item-body__sum">100 руб.</div>
                <a href="#" class="item-body__buy">
                  Купить
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Product;
