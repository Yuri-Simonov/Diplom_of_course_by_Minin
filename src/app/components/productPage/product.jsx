import React from "react";

const ProductPage = () => {
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
                <section className="shop__item">
                    <h3 className="shop__item__breadcrumbs"></h3>
                    <div className="shop__item-body item-body">
                        <div className="item-body__flex">
                            <div className="item-body__column-left">
                                <img src={"../img"} alt="doshik" />
                            </div>
                            <div className="item-body__column-right">
                                <h2 className="item-body__title title">
                                    Название товара
                                </h2>
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
                                <div className="item-body__id">id товара</div>
                                <div className="item-body__sum">100 руб.</div>
                                <a href="#" className="item-body__buy">
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

export default ProductPage;
