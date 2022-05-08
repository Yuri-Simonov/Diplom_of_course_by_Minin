import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
    changeProductsToBasketList,
    deleteBasketProductById
} from "../../store/basket";

const BasketItem = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="basket-item">
            <div className="basket-item__column-left">
                <img src={product.imgSrc} alt="img" />
            </div>
            <div className="basket-item__column-right">
                <Link
                    to={`/products/${product._id}`}
                    className="product__title title"
                >
                    {product.name}
                    {product.taste !== "" && <span> ({product.taste})</span>}
                </Link>
                <div className="basket-item__amount">
                    <div className="item-body__amount">
                        <div
                            className="item-body__amount-minus"
                            onClick={() =>
                                dispatch(
                                    changeProductsToBasketList(product, 1, true)
                                )
                            }
                        >
                            -
                        </div>
                        <div className="item-body__amount-number">
                            {product.value}
                        </div>
                        <div
                            className="item-body__amount-plus"
                            onClick={() =>
                                dispatch(changeProductsToBasketList(product))
                            }
                        >
                            +
                        </div>
                    </div>
                </div>
                <div className="basket-item__price">{product.price} руб.</div>
                <div
                    className="basket-item__close-btn"
                    onClick={() => dispatch(deleteBasketProductById(product))}
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
    );
};
BasketItem.propTypes = {
    product: PropTypes.object.isRequired
};

export default BasketItem;
