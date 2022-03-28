import React, { useState } from "react";
import { useBasket } from "../../hooks/useBasket";
import BackLink from "../backLinkComponent/backLink";
import BasketItem from "./basketItem";

const Basket = () => {
    const { clearBasket } = useBasket();
    let baksetProducts = JSON.parse(localStorage.getItem("productsForBasket"));

    let totalSum = 0;
    baksetProducts &&
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

    // Открытие и закрытие финальной модалки
    const [isModal, setModal] = useState(false);
    const openFinalModalWindow = () => {
        setModal(true);
        clearBasket();
    };
    const closeFinalModalWindow = (event) => {
        setModal(false);
    };

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
                            <button
                                className="shop__basket-final-btn item-body__buy"
                                onClick={() => openFinalModalWindow()}
                            >
                                Оформить заказ
                            </button>
                        </article>
                    </div>
                </section>
            </div>
            <div
                className={
                    "modal-final" + (isModal ? " modal-final-active" : "")
                }
            >
                <div className="modal-final__content">
                    <div className="modal-final__svg">
                        <svg
                            width="15"
                            height="13"
                            viewBox="0 0 15 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 1L4 11.01L1 8.01"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="modal-final__text">
                        Заказ успешно оформлен!
                    </div>
                    <div
                        className="modal-final__close-button"
                        onClick={(event) => closeFinalModalWindow(event)}
                    >
                        <svg
                            width="27"
                            height="24"
                            viewBox="0 0 27 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                y="22.6484"
                                width="34.4826"
                                height="1"
                                rx="0.5"
                                transform="rotate(-41.057 0 22.6484)"
                                fill="white"
                            />
                            <rect
                                width="34.4826"
                                height="1"
                                rx="0.5"
                                transform="matrix(-0.754056 -0.65681 -0.65681 0.754056 26.6582 22.6484)"
                                fill="white"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Basket;
