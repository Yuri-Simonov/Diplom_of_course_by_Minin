import React, { useState, useEffect, useContext } from "react";
import { useProducts } from "./useProducts";

const BasketContext = React.createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

const BasketProvider = ({ children }) => {
    const { products } = useProducts();

    //добавление товара в корзину (хедер)===============================================
    const [totalBasketCountArray, setTotalBasketCountArray] = useState([]);
    const [totalNumberBasketProducts, setTotalNumberBasketProducts] =
        useState(0);

    //функция, фильтрующая товары для массива корзины
    const changeAmountOfBasketProducts = (productItem) => {
        setTotalNumberBasketProducts((prevState) => prevState + 1);
        localStorage.setItem(
            `productBasket-${productItem._id}`,
            JSON.stringify(productItem)
        );
        let timeArrOfBusketProducts = [];
        products.filter((product) => {
            if (localStorage.getItem(`productBasket-${product._id}`)) {
                return timeArrOfBusketProducts.push(
                    JSON.parse(
                        localStorage.getItem(`productBasket-${product._id}`)
                    )
                );
            }
        });
        localStorage.setItem(
            "productsForBasket",
            JSON.stringify(timeArrOfBusketProducts)
        );
    };

    //добавление товаров в корзину
    const addItemToBasket = (product) => {
        let localFoundProductInBasket;
        if (localStorage.getItem(`productBasket-${product._id}`)) {
            localFoundProductInBasket = JSON.parse(
                localStorage.getItem(`productBasket-${product._id}`)
            );
            localFoundProductInBasket.value++;
            changeAmountOfBasketProducts(localFoundProductInBasket);
        } else {
            changeAmountOfBasketProducts(product);
        }
    };

    //Уменьшение количества товара в корзине
    const minusBasketItem = (product) => {
        let localFoundProductInBasket = JSON.parse(
            localStorage.getItem(`productBasket-${product._id}`)
        );
        localFoundProductInBasket.value--;
        if (localFoundProductInBasket.value === 0) {
            deleteBasketItem(product);
        }
        if (localFoundProductInBasket.value > 0) {
            changeAmountOfBasketProducts(localFoundProductInBasket);
        }
    };

    useEffect(() => {
        setTotalBasketCountArray(
            JSON.parse(localStorage.getItem("productsForBasket"))
        );
    }, [totalNumberBasketProducts]);

    //удаление товаров из корзины
    const deleteBasketItem = (basketItem) => {
        if (localStorage.getItem(`productBasket-${basketItem._id}`)) {
            localStorage.removeItem(`productBasket-${basketItem._id}`);
            setTotalNumberBasketProducts((prevState) => prevState - 1);
            const beforeDeleteBasketItem = JSON.parse(
                localStorage.getItem("productsForBasket")
            );
            let afterDeleteBasketItem = beforeDeleteBasketItem.filter(
                (item) => {
                    return item._id !== basketItem._id;
                }
            );
            localStorage.setItem(
                "productsForBasket",
                JSON.stringify(afterDeleteBasketItem)
            );
        }
    };

    // Очистка корзины при успешном оформлении заказа
    const clearBasket = () => {
        localStorage.removeItem("productsForBasket");
        setTotalNumberBasketProducts(0);
        for (let i = 0; i < localStorage.length; i++) {
            let localKey = localStorage.key(i);
            if (localKey.startsWith("productBasket-")) {
                const needKey = localKey.split(":")[0];
                localStorage.removeItem(needKey);
            }
        }
    };

    //===================================================================================

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

export default BasketProvider;
