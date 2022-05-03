import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../store/products";
import { getCurrentUserId } from "../store/users";

const FavoriteContext = React.createContext();

export const useFavorite = () => {
    return useContext(FavoriteContext);
};

const FavoriteProvider = ({ children }) => {
    const products = useSelector(getProducts());
    const currentUserId = useSelector(getCurrentUserId());

    // добавление товара в избранное (хедер)===============================================
    const [foundFavoriteProducts, setFoundFavoriteProducts] = useState([]);
    const [totalNumberFavoriteProducts, setTotalNumberFavoriteProducts] =
        useState(0);
    useEffect(() => {
        if (
            currentUserId &&
            localStorage.getItem(`productsFavorite-${currentUserId}`)
        ) {
            setTotalNumberFavoriteProducts(
                JSON.parse(
                    localStorage.getItem(`productsFavorite-${currentUserId}`)
                ).length
            );
        }
    }, [currentUserId]);
    const addItemToFavorites = (event, product) => {
        if (localStorage.getItem(`product-${product._id}-${currentUserId}`)) {
            setTotalNumberFavoriteProducts((prevState) => prevState - 1);
            localStorage.removeItem(`product-${product._id}-${currentUserId}`);
            changeAmountOfFavoriteProducts();
        } else {
            setTotalNumberFavoriteProducts((prevState) => prevState + 1);
            localStorage.setItem(
                `product-${product._id}-${currentUserId}`,
                JSON.stringify(product)
            );

            changeAmountOfFavoriteProducts();
        }
    };
    const changeAmountOfFavoriteProducts = () => {
        const timeArrOfFavoriteProducts = [];
        products.filter((product) => {
            if (
                localStorage.getItem(`product-${product._id}-${currentUserId}`)
            ) {
                timeArrOfFavoriteProducts.push(
                    JSON.parse(
                        localStorage.getItem(
                            `product-${product._id}-${currentUserId}`
                        )
                    )
                );
            }
            return timeArrOfFavoriteProducts;
        });
        localStorage.setItem(
            `productsFavorite-${currentUserId}`,
            JSON.stringify(timeArrOfFavoriteProducts)
        );

        setFoundFavoriteProducts(
            JSON.parse(
                localStorage.getItem(`productsFavorite-${currentUserId}`)
            )
        );
    };
    useEffect(() => {
        if (currentUserId) {
            setFoundFavoriteProducts(
                JSON.parse(
                    localStorage.getItem(`productsFavorite-${currentUserId}`)
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
