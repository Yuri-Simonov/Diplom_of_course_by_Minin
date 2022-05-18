import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchValue, changeValueSearch }) => {
    return (
        <section className="shop__search search">
            <form action="#" className="search__form">
                <input
                    type="text"
                    className="search__input"
                    placeholder="Поиск товаров"
                    value={searchValue}
                    onChange={(event) => changeValueSearch(event)}
                />
            </form>
        </section>
    );
};
Search.propTypes = {
    searchValue: PropTypes.string,
    changeValueSearch: PropTypes.func
};

export default Search;
