import React from "react";
import { useParams } from "react-router";
import ProductPage from "./productPage/product";
import ProductsList from "./productsPage/productsList";

const Products = () => {
    const params = useParams();
    const productId = params.productId;

    return productId ? <ProductPage productId={productId} /> : <ProductsList />;
};

export default Products;
