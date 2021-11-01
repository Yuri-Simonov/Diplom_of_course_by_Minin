import React from "react";
import { useParams } from "react-router";
import ProductPage from "./productPage/product";
import ProductsList from "./productsPage/productsList";

const Products = ({
    products,
    addItemToBasket,
    addItemToFavorites,
    sortBy,
    onSort
}) => {
    const params = useParams();
    const productId = params.productId;

    return productId ? (
        <ProductPage products={products} productId={productId} />
    ) : (
        <ProductsList
            addItemToBasket={addItemToBasket}
            addItemToFavorites={addItemToFavorites}
            products={products}
            sortBy={sortBy}
            onSort={onSort}
        />
    );
};

export default Products;
