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

    const sizeOnePage = 1;
    const pageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //выбор категории в левом меню
    const [selectedCategoryItem, setSelectedCategoryItem] = useState();
    const changeCategoryItems = (item) => {
        setSelectedCategoryItem(item);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategoryItem]);

    //фильтрация продуктов по категориям
    const filteredProductsCategory = selectedCategoryItem
        ? products.filter((item) => item.category === selectedCategoryItem)
        : products;
    //пагинация
    const allAmountProducts = filteredProductsCategory
        ? filteredProductsCategory.length
        : 0;

    const cropProducts = paginate(
        filteredProductsCategory,
        currentPage,
        sizeOnePage
    );
    //===================================================================================

    //очистка выбора категорий
    const clearCategory = () => {
        setSelectedCategoryItem();
    };

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
                    <Category
                        selectedCategoryItem={selectedCategoryItem}
                        changeCategoryItems={changeCategoryItems}
                        clearCategory={clearCategory}
                    />
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
