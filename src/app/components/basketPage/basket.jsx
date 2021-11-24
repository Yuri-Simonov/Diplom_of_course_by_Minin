import React from "react";
import BackLink from "../backLinkComponent/backLink";
import BasketItem from "./basketItem";

const Basket = ({ deleteBasketItem, minusBasketItem, plusBasketItem }) => {
    let baksetProducts = JSON.parse(localStorage.getItem("productsForBasket"));

    let totalSum = 0;
    baksetProducts.forEach((element) => {
        totalSum += element.price * element.value;
    });

    if (baksetProducts && baksetProducts.length > 0) {
        baksetProducts = baksetProducts.map((product) => {
            return (
                <article
                    key={product._id}
                    className="shop__basket-column-left-item"
                >
                    <BasketItem
                        key={product._id + "basket"}
                        product={product}
                        deleteBasketItem={deleteBasketItem}
                        plusBasketItem={plusBasketItem}
                        minusBasketItem={minusBasketItem}
                    />
                </article>
            );
        });
    } else {
        baksetProducts = (
            <h2 className="shop__basket-title">
                Вы ничего не добавили в корзину
            </h2>
        );
    }

    return (
        <main className="shop">
            <div className="container">
                <BackLink name="Вернуться к покупкам" />
                <section className="shop__basket">
                    <h2 className="shop__basket-title title">Корзина</h2>
                    <div className="shop__basket-flex">
                        <article className="shop__basket-column-left">
                            {baksetProducts}
                        </article>
                        <article className="shop__basket-column-right">
                            <div className="shop__basket__total-sum">
                                Итого: <span>{totalSum} руб.</span>
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
