import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import PropTypes from "prop-types";

const ProductsContext = React.createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

const ProductsProvider = ({ children }) => {
    // появление продуктов через 2 секунды===============================================
    const [products, setProducts] = useState();
    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    }, []);

    // сортировка=========================================================================
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
