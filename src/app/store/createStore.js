import productsReducer from "./products";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({ products: productsReducer });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
