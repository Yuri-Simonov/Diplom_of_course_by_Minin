import React, { useState, useEffect, useContext } from "react";
import api from "../api";

const ProductsContext = React.createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

const ProductsProvider = ({ children }) => {
    //появление продуктов через 2 секунды===============================================
    const [products, setProducts] = useState();
    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    }, []);

    //сортировка=========================================================================
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

export default ProductsProvider;
