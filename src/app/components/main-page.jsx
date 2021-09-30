import React from "react";
import doshik from "../img/doshik.jpg";
import { Link } from "react-router-dom";

const MainPage = () => {
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
        <section class="shop__content content">
          <article class="content__category category">
            <h2 class="category__title title">Категории:</h2>
            <div class="category__items">
              <a href="#" class="category__item hover">
                Обувь
              </a>
              <a href="#" class="category__item hover">
                Одежда
              </a>
              <a href="#" class="category__item hover">
                Головные уборы
              </a>
              <a href="#" class="category__item hover">
                Спортивный инвентарь
              </a>
              <a href="#" class="category__item hover">
                Продукты
              </a>
              <a href="#" class="category__item hover">
                Детское питание
              </a>
              <a href="#" class="category__item hover">
                Молочная продукция
              </a>
              <a href="#" class="category__item hover">
                Спортивное питание
              </a>
            </div>
          </article>
          <article class="content__body">
            <div class="content__sort sort">
              <h2 class="sort__title title">Сортировать по:</h2>
              <div class="sort__items">
                <p class="sort__item hover">Цена</p>
                <p class="sort__item hover">Производитель</p>
                <p class="sort__item hover">Срок доставки</p>
                <p class="sort__item hover">Рейтинг товара</p>
                <p class="sort__item hover">Количество отзывов</p>
              </div>
            </div>
            <article class="content__products products">
              <div class="products__product product">
                <div class="product__flex">
                  <div class="product__column-left">
                    <img src={doshik} alt="doshik" />
                  </div>
                  <div class="product__column-right">
                    <Link to="/main-page/product" class="product__title title">
                      Название товара
                    </Link>
                    <div class="product__people">
                      <div class="product__rating">
                        <svg
                          width="14"
                          height="13"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.54597 0.984332C6.72468 0.596896 7.27532 0.596897 7.45403 0.984332L8.85773 4.02756C8.93057 4.18546 9.08021 4.29418 9.25289 4.31466L12.5809 4.70925C13.0046 4.75949 13.1748 5.28318 12.8615 5.57286L10.401 7.84827C10.2734 7.96634 10.2162 8.14225 10.2501 8.31281L10.9032 11.5999C10.9864 12.0184 10.5409 12.342 10.1686 12.1336L7.24422 10.4967C7.09248 10.4118 6.90752 10.4118 6.75578 10.4967L3.8314 12.1336C3.45909 12.342 3.01361 12.0184 3.09676 11.5999L3.74991 8.31281C3.78379 8.14225 3.72664 7.96634 3.59897 7.84827L1.13846 5.57286C0.825207 5.28318 0.995366 4.75949 1.41906 4.70925L4.74711 4.31466C4.91979 4.29418 5.06943 4.18546 5.14227 4.02756L6.54597 0.984332Z"
                            fill="#FFD912"
                          />
                        </svg>
                        <p>4.8</p>
                      </div>
                      <div class="product__reviews">79 отзывов</div>
                    </div>
                    <div class="product__id">id товара</div>
                    <div class="product__price">100 руб.</div>
                    <button class="product__add-basket item-body__buy">
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
              <div class="products__product product">
                <div class="product__flex">
                  <div class="product__column-left">
                    <img src={doshik} alt="doshik" />
                  </div>
                  <div class="product__column-right">
                    <Link to="/main-page/product" class="product__title title">
                      Название товара
                    </Link>
                    <div class="product__people">
                      <div class="product__rating">
                        <svg
                          width="14"
                          height="13"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.54597 0.984332C6.72468 0.596896 7.27532 0.596897 7.45403 0.984332L8.85773 4.02756C8.93057 4.18546 9.08021 4.29418 9.25289 4.31466L12.5809 4.70925C13.0046 4.75949 13.1748 5.28318 12.8615 5.57286L10.401 7.84827C10.2734 7.96634 10.2162 8.14225 10.2501 8.31281L10.9032 11.5999C10.9864 12.0184 10.5409 12.342 10.1686 12.1336L7.24422 10.4967C7.09248 10.4118 6.90752 10.4118 6.75578 10.4967L3.8314 12.1336C3.45909 12.342 3.01361 12.0184 3.09676 11.5999L3.74991 8.31281C3.78379 8.14225 3.72664 7.96634 3.59897 7.84827L1.13846 5.57286C0.825207 5.28318 0.995366 4.75949 1.41906 4.70925L4.74711 4.31466C4.91979 4.29418 5.06943 4.18546 5.14227 4.02756L6.54597 0.984332Z"
                            fill="#FFD912"
                          />
                        </svg>
                        <p>4.8</p>
                      </div>
                      <div class="product__reviews">79 отзывов</div>
                    </div>
                    <div class="product__id">id товара</div>
                    <div class="product__price">100 руб.</div>
                    <button class="product__add-basket item-body__buy">
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
              <div class="products__product product">
                <div class="product__flex">
                  <div class="product__column-left">
                    <img src={doshik} alt="doshik" />
                  </div>
                  <div class="product__column-right">
                    <Link to="/main-page/product" class="product__title title">
                      Название товара
                    </Link>
                    <div class="product__people">
                      <div class="product__rating">
                        <svg
                          width="14"
                          height="13"
                          viewBox="0 0 14 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.54597 0.984332C6.72468 0.596896 7.27532 0.596897 7.45403 0.984332L8.85773 4.02756C8.93057 4.18546 9.08021 4.29418 9.25289 4.31466L12.5809 4.70925C13.0046 4.75949 13.1748 5.28318 12.8615 5.57286L10.401 7.84827C10.2734 7.96634 10.2162 8.14225 10.2501 8.31281L10.9032 11.5999C10.9864 12.0184 10.5409 12.342 10.1686 12.1336L7.24422 10.4967C7.09248 10.4118 6.90752 10.4118 6.75578 10.4967L3.8314 12.1336C3.45909 12.342 3.01361 12.0184 3.09676 11.5999L3.74991 8.31281C3.78379 8.14225 3.72664 7.96634 3.59897 7.84827L1.13846 5.57286C0.825207 5.28318 0.995366 4.75949 1.41906 4.70925L4.74711 4.31466C4.91979 4.29418 5.06943 4.18546 5.14227 4.02756L6.54597 0.984332Z"
                            fill="#FFD912"
                          />
                        </svg>
                        <p>4.8</p>
                      </div>
                      <div class="product__reviews">79 отзывов</div>
                    </div>
                    <div class="product__id">id товара</div>
                    <div class="product__price">100 руб.</div>
                    <button class="product__add-basket item-body__buy">
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </article>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
