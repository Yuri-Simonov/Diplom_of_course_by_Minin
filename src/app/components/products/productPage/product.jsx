import React, { useEffect, useState } from "react";
import { useBasket } from "../../../hooks/useBasket";
import { useProducts } from "../../../hooks/useProducts";
import BackLink from "../../backLinkComponent/backLink";
import PropTypes from "prop-types";
import Comments from "../../comments/comments";
import UserProvider from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const ProductPage = ({ productId }) => {
    const history = useHistory();
    const { products } = useProducts();
    const { addItemToBasket } = useBasket();
    const { currentUser } = useAuth();
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

    const [productCount, setProductCount] = useState(1);

    const upProductCount = () => {
        setProductCount((prevState) => prevState + 1);
    };
    const downProductCount = () => {
        if (productCount >= 1) {
            setProductCount((prevState) => prevState - 1);
        }
    };

    return (
        <main className="shop">
            <div className="container">
                <BackLink name="Вернуться к покупкам" />
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
                                        {foundProduct.taste !== "" && (
                                            <span> ({foundProduct.taste})</span>
                                        )}
                                    </h2>
                                    <div className="item-body__amount">
                                        <div
                                            className="item-body__amount-minus"
                                            onClick={downProductCount}
                                        >
                                            -
                                        </div>
                                        <div className="item-body__amount-number">
                                            {productCount}
                                        </div>
                                        <div
                                            className="item-body__amount-plus"
                                            onClick={upProductCount}
                                        >
                                            +
                                        </div>
                                    </div>
                                    <div className="item-body__sum">
                                        {foundProduct.price} руб.
                                    </div>
                                    {currentUser && (
                                        <button
                                            className="item-body__buy"
                                            onClick={() =>
                                                addItemToBasket(
                                                    foundProduct,
                                                    productCount
                                                )
                                            }
                                        >
                                            Добавить в корзину
                                        </button>
                                    )}
                                    {!currentUser && (
                                        <button
                                            className="item-body__buy"
                                            onClick={() =>
                                                history.push("/authorization")
                                            }
                                        >
                                            Добавить в корзину
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="shop__item-comments">
                            <UserProvider>
                                <Comments productId={productId} />
                            </UserProvider>
                        </div>
                    </section>
                ) : (
                    "Идет загрузка информации о товаре..."
                )}
            </div>
        </main>
    );
};
ProductPage.propTypes = {
    productId: PropTypes.string.isRequired
};

export default ProductPage;
