import React, { useState, useEffect, useContext } from "react";
import { useProducts } from "./useProducts";
import PropTypes from "prop-types";
import { useAuth } from "./useAuth";

const FavoriteContext = React.createContext();

export const useFavorite = () => {
    return useContext(FavoriteContext);
};

const FavoriteProvider = ({ children }) => {
    const { products } = useProducts();
    const { currentUser } = useAuth();

    // добавление товара в избранное (хедер)===============================================
    const [foundFavoriteProducts, setFoundFavoriteProducts] = useState([]);
    const [totalNumberFavoriteProducts, setTotalNumberFavoriteProducts] =
        useState(0);
    useEffect(() => {
        if (
            currentUser &&
            localStorage.getItem(`productsFavorite-${currentUser._id}`)
        ) {
            setTotalNumberFavoriteProducts(
                JSON.parse(
                    localStorage.getItem(`productsFavorite-${currentUser._id}`)
                ).length
            );
        }
    }, [currentUser]);
    const addItemToFavorites = (event, product) => {
        if (localStorage.getItem(`product-${product._id}-${currentUser._id}`)) {
            setTotalNumberFavoriteProducts((prevState) => prevState - 1);
            localStorage.removeItem(
                `product-${product._id}-${currentUser._id}`
            );
            changeAmountOfFavoriteProducts();
        } else {
            setTotalNumberFavoriteProducts((prevState) => prevState + 1);
            localStorage.setItem(
                `product-${product._id}-${currentUser._id}`,
                JSON.stringify(product)
            );

            changeAmountOfFavoriteProducts();
        }
    };
    const changeAmountOfFavoriteProducts = () => {
        const timeArrOfFavoriteProducts = [];
        products.filter((product) => {
            if (
                localStorage.getItem(
                    `product-${product._id}-${currentUser._id}`
                )
            ) {
                timeArrOfFavoriteProducts.push(
                    JSON.parse(
                        localStorage.getItem(
                            `product-${product._id}-${currentUser._id}`
                        )
                    )
                );
            }
            return timeArrOfFavoriteProducts;
        });
        localStorage.setItem(
            `productsFavorite-${currentUser._id}`,
            JSON.stringify(timeArrOfFavoriteProducts)
        );

        setFoundFavoriteProducts(
            JSON.parse(
                localStorage.getItem(`productsFavorite-${currentUser._id}`)
            )
        );
    };
    useEffect(() => {
        if (currentUser) {
            setFoundFavoriteProducts(
                JSON.parse(
                    localStorage.getItem(`productsFavorite-${currentUser._id}`)
                )
            );
        }
    }, [totalNumberFavoriteProducts]);
    // ===================================================================================

    return (
        <FavoriteContext.Provider
            value={{ foundFavoriteProducts, addItemToFavorites }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};
FavoriteProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default FavoriteProvider;
