const { combineReducers, configureStore } = require("@reduxjs/toolkit");
import productsReducer from "./products";

const rootReducer = combineReducers({ products: productsReducer });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
