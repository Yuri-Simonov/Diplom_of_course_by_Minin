import React from "react";
import { useFavorite } from "../../hooks/useFavorite";
import { useProducts } from "../../hooks/useProducts";
import BackLink from "../backLinkComponent/backLink";
import ProductsItem from "../products/productsPage/productsItem";

const FavoritesPage = () => {
    const { products } = useProducts();
    const { foundFavoriteProducts } = useFavorite();

    let favoriteProducts;
    if (foundFavoriteProducts && foundFavoriteProducts.length === 0) {
        favoriteProducts = (
            <h2 className="shop__basket-title">
                Вы ничего не добавили в избранное
            </h2>
        );
    } else if (products && foundFavoriteProducts) {
        favoriteProducts = foundFavoriteProducts.map((product) => {
            return <ProductsItem key={product._id} product={product} />;
        });
    } else {
        favoriteProducts = "Похоже, что вы ничего не добавили в избранное...";
    }

    return (
        <main className="shop">
            <div className="container">
                <section className="shop__basket">
                    <BackLink name="Вернуться к покупкам" />
                    <h2 className="shop__basket-title title">Избранное</h2>
                    <div>{favoriteProducts}</div>
                </section>
            </div>
        </main>
    );
};

export default FavoritesPage;
