import commentsReducer from "./comments";
import favouritesReducer from "./favourite";
import productsReducer from "./products";
import usersReducer from "./users";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    products: productsReducer,
    users: usersReducer,
    comments: commentsReducer,
    favourites: favouritesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
