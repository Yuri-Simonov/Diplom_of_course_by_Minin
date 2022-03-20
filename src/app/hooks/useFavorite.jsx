import React, { useState, useEffect, useContext } from "react";
import { useProducts } from "./useProducts";

const FavoriteContext = React.createContext();

export const useFavorite = () => {
    return useContext(FavoriteContext);
};

const FavoriteProvider = ({ children }) => {
    const { products } = useProducts();

    //добавление товара в избранное (хедер)===============================================
    const [foundFavoriteProducts, setFoundFavoriteProducts] = useState([]);
    const [totalNumberFavoriteProducts, setTotalNumberFavoriteProducts] =
        useState(0);

    const addItemToFavorites = (event, product) => {
        if (localStorage.getItem(`product-${product._id}`)) {
            setTotalNumberFavoriteProducts((prevState) => prevState - 1);
            localStorage.removeItem(`product-${product._id}`);
            changeAmountOfFavoriteProducts();
        } else {
            setTotalNumberFavoriteProducts((prevState) => prevState + 1);
            localStorage.setItem(
                `product-${product._id}`,
                JSON.stringify(product)
            );

            changeAmountOfFavoriteProducts();
        }
    };

    const changeAmountOfFavoriteProducts = () => {
        let timeArrOfFavoriteProducts = [];
        products.filter((product) => {
            if (localStorage.getItem(`product-${product._id}`)) {
                return timeArrOfFavoriteProducts.push(
                    JSON.parse(localStorage.getItem(`product-${product._id}`))
                );
            }
        });
        localStorage.setItem(
            "productsFavorite",
            JSON.stringify(timeArrOfFavoriteProducts)
        );
        setFoundFavoriteProducts(
            JSON.parse(localStorage.getItem("productsFavorite"))
        );
    };

    useEffect(() => {
        setFoundFavoriteProducts(
            JSON.parse(localStorage.getItem("productsFavorite"))
        );
    }, [totalNumberFavoriteProducts]);
    //===================================================================================

    return (
        <FavoriteContext.Provider
            value={{ foundFavoriteProducts, addItemToFavorites }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;
