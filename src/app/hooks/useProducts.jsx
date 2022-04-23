import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import productsService from "../services/products.service";
import { useErrors } from "./useErrors";

const ProductsContext = React.createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

const ProductsProvider = ({ children }) => {
    const { catcherError } = useErrors();
    // Запрос продуктов у сервера ==========================================
    const [products, setProducts] = useState();
    useEffect(() => {
        getProducts();
    }, []);
    async function getProducts() {
        try {
            const { content } = await productsService.get();
            setProducts(content);
        } catch (error) {
            catcherError(error);
        }
    }
    // сортировка =========================================================
    const [sortBy, setSortBy] = useState({ iter: "", order: "" });
    const onSort = (item) => {
        setSortBy(item);
    };

    return (
        <ProductsContext.Provider value={{ products, sortBy, onSort }}>
            {children}
        </ProductsContext.Provider>
    );
};
ProductsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductsProvider;
