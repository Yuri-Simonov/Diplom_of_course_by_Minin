import React, { useState, useEffect, useContext } from "react";
// import api from "../api";
import PropTypes from "prop-types";
import productsService from "../services/products.service";

const ProductsContext = React.createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

const ProductsProvider = ({ children }) => {
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
            alert(`Произошла ошибка: ${error.message}`);
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
