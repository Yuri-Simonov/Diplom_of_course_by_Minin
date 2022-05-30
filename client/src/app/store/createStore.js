import basketReducer from "./basket";
import commentsReducer from "./comments";
import favouritesReducer from "./favourite";
import productsReducer from "./products";
import usersReducer from "./users";

const {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} = require("@reduxjs/toolkit");

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
});

const rootReducer = combineReducers({
    products: productsReducer,
    users: usersReducer,
    comments: commentsReducer,
    favourites: favouritesReducer,
    basket: basketReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: customizedMiddleware
    });
}
