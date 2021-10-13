import React from "react";

const Search = () => {
    return (
        <section className="shop__search search">
            <form action="#" className="search__form">
                <input
                    type="text"
                    className="search__input"
                    placeholder="Поиск товаров"
                />
                <input
                    type="submit"
                    className="search__submit"
                    value="Искать"
                />
            </form>
        </section>
    );
};

export default Search;
