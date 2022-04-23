import React, { useState, useEffect, useContext } from "react";
import { useProducts } from "./useProducts";
import PropTypes from "prop-types";
import { useAuth } from "./useAuth";

const BasketContext = React.createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

const BasketProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const { products } = useProducts();

    // добавление товара в корзину (хедер)===============================================
    const [totalBasketCountArray, setTotalBasketCountArray] = useState([]);
    const [totalNumberBasketProducts, setTotalNumberBasketProducts] =
        useState(0);

    useEffect(() => {
        if (
            currentUser &&
            localStorage.getItem(`productsForBasket-${currentUser._id}`)
        ) {
            setTotalNumberBasketProducts(
                JSON.parse(
                    localStorage.getItem(`productsForBasket-${currentUser._id}`)
                ).length
            );
        }
    }, [currentUser]);

    // функция, фильтрующая товары для массива корзины
    const changeAmountOfBasketProducts = (productItem, currentCounter) => {
        setTotalNumberBasketProducts((prevState) => prevState + currentCounter);
        if (
            localStorage.getItem(
                `productBasket-${productItem._id}-${currentUser._id}`
            )
        ) {
            localStorage.setItem(
                `productBasket-${productItem._id}-${currentUser._id}`,
                JSON.stringify(productItem)
            );
        } else {
            localStorage.setItem(
                `productBasket-${productItem._id}-${currentUser._id}`,
                JSON.stringify({ ...productItem, value: currentCounter })
            );
        }
        const timeArrOfBusketProducts = [];
        products.filter((product) => {
            if (
                localStorage.getItem(
                    `productBasket-${product._id}-${currentUser._id}`
                )
            ) {
                timeArrOfBusketProducts.push(
                    JSON.parse(
                        localStorage.getItem(
                            `productBasket-${product._id}-${currentUser._id}`
                        )
                    )
                );
            }
            return timeArrOfBusketProducts;
        });
        localStorage.setItem(
            `productsForBasket-${currentUser._id}`,
            JSON.stringify(timeArrOfBusketProducts)
        );
    };

    // добавление товаров в корзину
    const addItemToBasket = (product, amount = 1) => {
        let localFoundProductInBasket;
        if (
            localStorage.getItem(
                `productBasket-${product._id}-${currentUser._id}`
            )
        ) {
            localFoundProductInBasket = JSON.parse(
                localStorage.getItem(
                    `productBasket-${product._id}-${currentUser._id}`
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
                `productBasket-${product._id}-${currentUser._id}`
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
        if (currentUser) {
            setTotalBasketCountArray(
                JSON.parse(
                    localStorage.getItem(`productsForBasket-${currentUser._id}`)
                )
            );
        }
    }, [totalNumberBasketProducts]);

    // удаление товаров из корзины
    const deleteBasketItem = (basketItem) => {
        if (
            localStorage.getItem(
                `productBasket-${basketItem._id}-${currentUser._id}`
            )
        ) {
            localStorage.removeItem(
                `productBasket-${basketItem._id}-${currentUser._id}`
            );
            setTotalNumberBasketProducts((prevState) => prevState - 1);
            const beforeDeleteBasketItem = JSON.parse(
                localStorage.getItem(`productsForBasket-${currentUser._id}`)
            );
            const afterDeleteBasketItem = beforeDeleteBasketItem.filter(
                (item) => {
                    return item._id !== basketItem._id;
                }
            );
            localStorage.setItem(
                `productsForBasket-${currentUser._id}`,
                JSON.stringify(afterDeleteBasketItem)
            );
        }
    };

    //  Очистка корзины при успешном оформлении заказа
    const clearBasket = () => {
        localStorage.removeItem(`productsForBasket-${currentUser._id}`);
        setTotalNumberBasketProducts(0);
        for (let i = 0; i < localStorage.length; i++) {
            const localKey = localStorage.key(i);
            if (localKey.endsWith(currentUser._id)) {
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
