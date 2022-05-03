import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../store/products";
import { getCurrentUserId } from "../store/users";

const BasketContext = React.createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

const BasketProvider = ({ children }) => {
    const products = useSelector(getProducts());
    const currentUserId = useSelector(getCurrentUserId());

    // добавление товара в корзину (хедер)===============================================
    const [totalBasketCountArray, setTotalBasketCountArray] = useState([]);
    const [totalNumberBasketProducts, setTotalNumberBasketProducts] =
        useState(0);

    useEffect(() => {
        if (
            currentUserId &&
            localStorage.getItem(`productsForBasket-${currentUserId}`)
        ) {
            setTotalNumberBasketProducts(
                JSON.parse(
                    localStorage.getItem(`productsForBasket-${currentUserId}`)
                ).length
            );
        }
    }, [currentUserId]);

    // функция, фильтрующая товары для массива корзины
    const changeAmountOfBasketProducts = (productItem, currentCounter) => {
        setTotalNumberBasketProducts((prevState) => prevState + currentCounter);
        if (
            localStorage.getItem(
                `productBasket-${productItem._id}-${currentUserId}`
            )
        ) {
            localStorage.setItem(
                `productBasket-${productItem._id}-${currentUserId}`,
                JSON.stringify(productItem)
            );
        } else {
            localStorage.setItem(
                `productBasket-${productItem._id}-${currentUserId}`,
                JSON.stringify({ ...productItem, value: currentCounter })
            );
        }
        const timeArrOfBusketProducts = [];
        products.filter((product) => {
            if (
                localStorage.getItem(
                    `productBasket-${product._id}-${currentUserId}`
                )
            ) {
                timeArrOfBusketProducts.push(
                    JSON.parse(
                        localStorage.getItem(
                            `productBasket-${product._id}-${currentUserId}`
                        )
                    )
                );
            }
            return timeArrOfBusketProducts;
        });
        localStorage.setItem(
            `productsForBasket-${currentUserId}`,
            JSON.stringify(timeArrOfBusketProducts)
        );
    };

    // добавление товаров в корзину
    const addItemToBasket = (product, amount = 1) => {
        let localFoundProductInBasket;
        if (
            localStorage.getItem(
                `productBasket-${product._id}-${currentUserId}`
            )
        ) {
            localFoundProductInBasket = JSON.parse(
                localStorage.getItem(
                    `productBasket-${product._id}-${currentUserId}`
                )
            );
            localFoundProductInBasket.value += amount;

            changeAmountOfBasketProducts(localFoundProductInBasket, amount);
        } else {
            const currentCounter = amount;
            return changeAmountOfBasketProducts(product, currentCounter);
        }
    };

    // Уменьшение количества товара в корзине
    const minusBasketItem = (product) => {
        const localFoundProductInBasket = JSON.parse(
            localStorage.getItem(
                `productBasket-${product._id}-${currentUserId}`
            )
        );
        localFoundProductInBasket.value--;
        if (localFoundProductInBasket.value === 0) {
            deleteBasketItem(product);
        }
        if (localFoundProductInBasket.value > 0) {
            changeAmountOfBasketProducts(localFoundProductInBasket, 1);
        }
    };

    useEffect(() => {
        if (currentUserId) {
            setTotalBasketCountArray(
                JSON.parse(
                    localStorage.getItem(`productsForBasket-${currentUserId}`)
                )
            );
        }
    }, [totalNumberBasketProducts]);

    // удаление товаров из корзины
    const deleteBasketItem = (basketItem) => {
        if (
            localStorage.getItem(
                `productBasket-${basketItem._id}-${currentUserId}`
            )
        ) {
            localStorage.removeItem(
                `productBasket-${basketItem._id}-${currentUserId}`
            );
            setTotalNumberBasketProducts((prevState) => prevState - 1);
            const beforeDeleteBasketItem = JSON.parse(
                localStorage.getItem(`productsForBasket-${currentUserId}`)
            );
            const afterDeleteBasketItem = beforeDeleteBasketItem.filter(
                (item) => {
                    return item._id !== basketItem._id;
                }
            );
            localStorage.setItem(
                `productsForBasket-${currentUserId}`,
                JSON.stringify(afterDeleteBasketItem)
            );
        }
    };

    //  Очистка корзины при успешном оформлении заказа
    const clearBasket = () => {
        localStorage.removeItem(`productsForBasket-${currentUserId}`);
        setTotalNumberBasketProducts(0);
        for (let i = 0; i < localStorage.length; i++) {
            const localKey = localStorage.key(i);
            if (localKey.endsWith(currentUserId)) {
                const needKey = localKey.split(":")[0];
                localStorage.removeItem(needKey);
            }
        }
    };

    // ===================================================================================

    return (
        <BasketContext.Provider
            value={{
                deleteBasketItem,
                addItemToBasket,
                minusBasketItem,
                clearBasket,
                totalBasketCountArray
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};
BasketProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BasketProvider;
