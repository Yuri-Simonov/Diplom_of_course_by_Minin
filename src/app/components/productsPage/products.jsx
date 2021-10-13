import React, { useState, useEffect } from "react";
import Category from "./category/category";
import Sort from "./sort/sort";
import Search from "../search/search";
import ProductsItem from "./productsItem";
import api from "../../api";

const ProductsPage = ({...rest}) => {
   
    //появление продуктов через 2 секунды===============================================
	const [products, setProducts] = useState();
	useEffect(() => {
		api.products.fetchAll().then((data) => setProducts(data));
	});

    let downloadProducts;
    if (products) {
        downloadProducts = products.map((product) => {
            return (
                <ProductsItem
                    key={product._id}
                    product={product}
                    {...rest}
                />
            );
        });
    } else {
        downloadProducts = "Пожалуйста, подождтите...";
    }
    //===================================================================================

    return (
        <main className="shop">
            <div className="container">
                <Search />
                <section className="shop__content content">
                    <Category />
                    <article className="content__body">
                        <Sort />
                        <article className="content__products products">
                            {downloadProducts}
                        </article>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default ProductsPage;
