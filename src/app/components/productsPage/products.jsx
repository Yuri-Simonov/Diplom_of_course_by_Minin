import React, { useState, useEffect } from "react";
import Category from "./category/category";
import Sort from "./sort/sort";
import Search from "../search/search";
import ProductsItem from "./productsItem";
import api from "../../api";
import Pagination from "../pagination/pagination";
import { paginate } from "../../../utils/paginate";

const ProductsPage = ({ ...rest }) => {
    //появление продуктов через 2 секунды===============================================
    const [products, setProducts] = useState();
    useEffect(() => {
        api.products.fetchAll().then((data) => setProducts(data));
    });

    //Pagination=========================================================================
    const [currentPage, setCurrentPage] = useState(1);
    /*  const allAmountProducts = products.length; */
    const allAmountProducts = 11;
    const sizeOnePage = 3;
    const pageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const cropProducts = paginate(products, currentPage, sizeOnePage);
    //===================================================================================

    let downloadProducts;
    if (products) {
        downloadProducts = cropProducts.map((product) => {
            return (
                <ProductsItem key={product._id} product={product} {...rest} />
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
                        <Pagination
                            allAmountProducts={allAmountProducts}
                            sizeOnePage={sizeOnePage}
                            pageChange={pageChange}
                            currentPage={currentPage}
                        />
                    </article>
                </section>
            </div>
        </main>
    );
};

export default ProductsPage;
