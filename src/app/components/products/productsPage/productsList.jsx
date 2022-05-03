import React, { useState, useEffect } from "react";
import Category from "./category/category";
import Sort from "./sort/sort";
import Search from "../../search/search";
import ProductsItem from "./productsItem";
import Pagination from "../../pagination/pagination";
import { paginate } from "../../../../utils/paginate";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getProducts } from "../../../store/products";

const ProductsPage = () => {
    const products = useSelector(getProducts());
    // сортировка =========================================================
    const [sortBy, setSortBy] = useState({ iter: "", order: "" });
    const onSort = (item) => {
        setSortBy(item);
    };
    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    // выбор категории в левом меню
    const [selectedCategoryItem, setSelectedCategoryItem] = useState();
    // поиск продуктов
    const [searchValue, setSearchValue] = useState("");
    const [searchValueFoundProducts, setSearchValueFoundProducts] = useState();

    const sizeOnePage = 3;
    const pageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // выбор категории в левом меню
    const changeCategoryItems = (item) => {
        setSelectedCategoryItem(item);
        setCurrentPage(1);
        setSearchValue("");
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategoryItem]);

    // поиск продуктов
    const changeValueSearch = (event) => {
        setSearchValue(() => event.target.value);
        setSelectedCategoryItem();
        setCurrentPage(1);
    };
    useEffect(() => {
        if (searchValue.length > 0) {
            setSearchValueFoundProducts(
                products.filter((product) =>
                    product.name
                        .toLowerCase()
                        .replace(/\s+/g, "")
                        .includes(searchValue.toLowerCase().trim())
                )
            );
        }
    }, [searchValue]);

    // фильтрация продуктов по категориям или поиску
    let filteredProductsCategory;
    if (selectedCategoryItem) {
        filteredProductsCategory = products.filter(
            (item) => item.category === selectedCategoryItem
        );
    } else if (searchValue.length > 0) {
        filteredProductsCategory = searchValueFoundProducts;
    } else {
        filteredProductsCategory = products;
    }

    const sortedProducts = _.orderBy(
        filteredProductsCategory,
        [sortBy.iter],
        [sortBy.order]
    );
    // пагинация
    const allAmountProducts = filteredProductsCategory
        ? filteredProductsCategory.length
        : 0;

    const cropProducts = paginate(sortedProducts, currentPage, sizeOnePage);
    // ===================================================================================

    // очистка выбора категорий
    const clearCategory = () => {
        setSelectedCategoryItem();
    };

    let downloadProducts;
    if (products) {
        downloadProducts = cropProducts.map((product) => {
            return <ProductsItem key={product._id} product={product} />;
        });
    } else {
        downloadProducts = "Пожалуйста, подождтите...";
    }
    // ===================================================================================

    return (
        <main className="shop">
            <div className="container">
                <Search
                    searchValue={searchValue}
                    changeValueSearch={changeValueSearch}
                />
                <section className="shop__content content">
                    <Category
                        selectedCategoryItem={selectedCategoryItem}
                        changeCategoryItems={changeCategoryItems}
                        clearCategory={clearCategory}
                    />
                    <article className="content__body">
                        <Sort onSort={onSort} currentSort={sortBy} />
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
