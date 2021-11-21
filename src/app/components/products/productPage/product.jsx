import React, { useEffect, useState } from "react";
import BackLink from "../../backLinkComponent/backLink";

const ProductPage = ({ productId, products }) => {
    const [foundProduct, setFoundProduct] = useState();
    useEffect(() => {
        if (products) {
            setFoundProduct(
                products.find((product) => {
                    return product._id === productId;
                })
            );
        }
    }, [products]);

    return (
        <main className="shop">
            <div className="container">
                <BackLink name="Вернуться к списку продуктов" />
                <h3 className="shop__item__breadcrumbs">Хлебные крошки</h3>
                {foundProduct ? (
                    <section className="shop__item">
                        <div className="shop__item-body item-body">
                            <div className="item-body__flex">
                                <div className="item-body__column-left">
                                    <img
                                        src={foundProduct.imgSrc}
                                        alt="product"
                                    />
                                </div>
                                <div className="item-body__column-right">
                                    <h2 className="item-body__title title">
                                        {foundProduct.name}
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
                                    <div className="item-body__id">
                                        Id товара: {foundProduct._id}
                                    </div>
                                    <div className="item-body__sum">
                                        {foundProduct.price} руб.
                                    </div>
                                    <button className="item-body__buy">
                                        Купить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    "Идет загрузка информации о товаре..."
                )}
            </div>
        </main>
    );
};

export default ProductPage;
