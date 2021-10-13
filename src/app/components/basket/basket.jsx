import React from "react";

const Basket = () => {
    return (
        <main className="shop">
            <div className="container">
                <section className="shop__search search">
                    <form action="#" className="search__form">
                        <input
                            type="text"
                            className="search__input"
                            placeholder="Поиск товаров"
                        />
                        <input
                            type="submit"
                            className="search__submit"
                            value="Искать"
                        />
                    </form>
                </section>
                <section className="shop__basket">
                    <h2 className="shop__basket-title title">Корзина</h2>
                    <div className="shop__basket-flex">
                        <article className="shop__basket-column-left">
                            <div className="basket-item">
                                <div className="basket-item__column-left">
                                    <img src={"../"} alt="doshik" />
                                </div>
                                <div className="basket-item__column-right">
                                    <h2 className="basket-item__title title">
                                        Название товара
                                    </h2>
                                    <div className="basket-item__id">
                                        id товара
                                    </div>
                                    <div className="basket-item__amount">
                                        <div className="item-body__amount">
                                            <div className="item-body__amount-minus">
                                                -
                                            </div>
                                            <div className="item-body__amount-number">
                                                1
                                            </div>
                                            <div className="item-body__amount-plus">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <div className="basket-item__price">
                                        100 руб.
                                    </div>
                                    <div className="basket-item__close-btn">
                                        x
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className="shop__basket-column-right">
                            <div className="shop__basket__total-sum">
                                Итого: 1000 руб.
                            </div>
                            <button className="shop__basket-final-btn item-body__buy">
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
