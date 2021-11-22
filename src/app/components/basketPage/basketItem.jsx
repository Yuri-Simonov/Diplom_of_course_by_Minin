import React from "react";
import { Link } from "react-router-dom";

const BasketItem = ({ product }) => {
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
                <div className="basket-item__id">
                    Id товара: <i>{product._id}</i>
                </div>
                <div className="basket-item__amount">
                    <div className="item-body__amount">
                        <div className="item-body__amount-minus">-</div>
                        <div className="item-body__amount-number">1</div>
                        <div className="item-body__amount-plus">+</div>
                    </div>
                </div>
                <div className="basket-item__price">{product.price} руб.</div>
                <div className="basket-item__close-btn">x</div>
            </div>
        </div>
    );
};

export default BasketItem;
