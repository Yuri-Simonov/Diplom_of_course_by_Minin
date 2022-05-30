import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { constants } from "../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import { getFavouritesById, toggleFavourite } from "../../../store/favourite";
import { changeProductsToBasketList } from "../../../store/basket";
import { getProductsError } from "../../../store/products";
import { errorCatcher } from "../../../../utils/errorCatcher";

const ProductsItem = ({ product }) => {
    const dispatch = useDispatch();
    const productError = useSelector(getProductsError());
    if (productError) {
        errorCatcher();
    }
    const currentUserId = useSelector(getCurrentUserId());
    const isFavourite = useSelector(getFavouritesById(product._id));

    let reviewWord;
    if (Number(product.reviews) === 0 || Number(product.reviews) % 10 === 0) {
        reviewWord = "отзывов";
    } else if (Number(product.reviews) === 1) {
        reviewWord = "отзыв";
    } else {
        reviewWord = "отзыва";
    }

    let colorOfStar;
    if (product.rating >= 4.8 && product.rating <= 5) {
        colorOfStar = "green";
    } else if (product.rating >= 4.3 && product.rating <= 4.7) {
        colorOfStar = "lightgreen";
    } else if (product.rating >= 3.8 && product.rating <= 4.2) {
        colorOfStar = "yellow";
    } else if (product.rating <= 3.7) {
        colorOfStar = "red";
    }

    return (
        <div className="products__product product">
            <div className="product__flex">
                <Link to={`/products/${product._id}`}>
                    <div className="product__column-left">
                        <img src={product.imgSrc} alt="img" />
                    </div>
                </Link>
                <div className="product__column-right">
                    <h2 className="product__title title">
                        {product.name}
                        {product.taste !== "" && (
                            <span> ({product.taste})</span>
                        )}
                    </h2>
                    <div className="product__people">
                        <div className="product__rating">
                            <svg
                                width="14"
                                height="13"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.54597 0.984332C6.72468 0.596896 7.27532 0.596897 7.45403 0.984332L8.85773 4.02756C8.93057 4.18546 9.08021 4.29418 9.25289 4.31466L12.5809 4.70925C13.0046 4.75949 13.1748 5.28318 12.8615 5.57286L10.401 7.84827C10.2734 7.96634 10.2162 8.14225 10.2501 8.31281L10.9032 11.5999C10.9864 12.0184 10.5409 12.342 10.1686 12.1336L7.24422 10.4967C7.09248 10.4118 6.90752 10.4118 6.75578 10.4967L3.8314 12.1336C3.45909 12.342 3.01361 12.0184 3.09676 11.5999L3.74991 8.31281C3.78379 8.14225 3.72664 7.96634 3.59897 7.84827L1.13846 5.57286C0.825207 5.28318 0.995366 4.75949 1.41906 4.70925L4.74711 4.31466C4.91979 4.29418 5.06943 4.18546 5.14227 4.02756L6.54597 0.984332Z"
                                    fill={colorOfStar}
                                />
                            </svg>
                            <p>{product.rating}</p>
                        </div>
                        <div className="product__reviews">
                            {product.reviews} {reviewWord}
                        </div>
                    </div>
                    <div className="product__price">{product.price} руб.</div>
                    <button
                        className="product__add-basket item-body__buy"
                        onClick={
                            currentUserId
                                ? () =>
                                      dispatch(
                                          changeProductsToBasketList(product)
                                      )
                                : () =>
                                      errorCatcher(
                                          constants.messages.addToBasket
                                      )
                        }
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
            <div
                className={
                    "product__favorites" +
                    (isFavourite ? " product__favorites-active" : "")
                }
                onClick={
                    currentUserId
                        ? () => dispatch(toggleFavourite(product))
                        : () => errorCatcher(constants.messages.addToFavourite)
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
    );
};
ProductsItem.propTypes = {
    product: PropTypes.object.isRequired,
    addItemToBasket: PropTypes.func,
    addItemToFavorites: PropTypes.func
};

export default ProductsItem;
