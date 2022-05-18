import React, { useEffect, useState } from "react";
import BackLink from "../../backLinkComponent/backLink";
import PropTypes from "prop-types";
import Comments from "../../comments/comments";
import { constants } from "../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductsError } from "../../../store/products";
import { getCurrentUserId } from "../../../store/users";
import { getFavouritesById, toggleFavourite } from "../../../store/favourite";
import { changeProductsToBasketList } from "../../../store/basket";
import { errorCatcher } from "../../../../utils/errorCatcher";

const ProductPage = ({ productId }) => {
    const dispatch = useDispatch();
    const products = useSelector(getProducts());

    const productError = useSelector(getProductsError());
    if (productError) {
        errorCatcher(productError);
    }
    const currentUserId = useSelector(getCurrentUserId());
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

    const isFavourite = useSelector(getFavouritesById(productId));

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
                                    {currentUserId && (
                                        <button
                                            className="item-body__buy"
                                            onClick={() =>
                                                dispatch(
                                                    changeProductsToBasketList(
                                                        foundProduct,
                                                        productCount
                                                    )
                                                )
                                            }
                                        >
                                            Добавить в корзину
                                        </button>
                                    )}
                                    {!currentUserId && (
                                        <button
                                            className="item-body__buy"
                                            onClick={() =>
                                                errorCatcher(
                                                    constants.messages
                                                        .addToBasket
                                                )
                                            }
                                        >
                                            Добавить в корзину
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div
                                className={
                                    "product__favorites" +
                                    (isFavourite
                                        ? " product__favorites-active"
                                        : "")
                                }
                                onClick={
                                    currentUserId
                                        ? () =>
                                              dispatch(
                                                  toggleFavourite(foundProduct)
                                              )
                                        : () =>
                                              errorCatcher(
                                                  constants.messages
                                                      .addToFavourite
                                              )
                                }
                            >
                                <svg
                                    width="14"
                                    height="13"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.54597 0.984332C6.72468 0.596896 7.27532 0.596897 7.45403 0.984332L8.85773 4.02756C8.93057 4.18546 9.08021 4.29418 9.25289 4.31466L12.5809 4.70925C13.0046 4.75949 13.1748 5.28318 12.8615 5.57286L10.401 7.84827C10.2734 7.96634 10.2162 8.14225 10.2501 8.31281L10.9032 11.5999C10.9864 12.0184 10.5409 12.342 10.1686 12.1336L7.24422 10.4967C7.09248 10.4118 6.90752 10.4118 6.75578 10.4967L3.8314 12.1336C3.45909 12.342 3.01361 12.0184 3.09676 11.5999L3.74991 8.31281C3.78379 8.14225 3.72664 7.96634 3.59897 7.84827L1.13846 5.57286C0.825207 5.28318 0.995366 4.75949 1.41906 4.70925L4.74711 4.31466C4.91979 4.29418 5.06943 4.18546 5.14227 4.02756L6.54597 0.984332Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="shop__item-comments">
                            <Comments productId={productId} />
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
