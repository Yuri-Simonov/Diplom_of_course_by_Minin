import { createSlice, createAction } from "@reduxjs/toolkit";
import { getCurrentUserId } from "./users";

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        entities: null,
        entitiesAmount: 0
    },
    reducers: {
        favouritesReceived: (state, action) => {
            state.entities = action.payload;
        },
        favouritesReceivedLength: (state, action) => {
            state.entitiesAmount = action.payload;
        }
    }
});

const { reducer: favouritesReducer, actions } = favouritesSlice;
const { favouritesReceived, favouritesReceivedLength } = actions;

const favouritesRequested = createAction("favourites/favouritesRequested");

export const loadFavouritesList = () => (dispatch, getState) => {
    dispatch(favouritesRequested());
    const currentUserId = getCurrentUserId()(getState());
    const favouritesProducts = JSON.parse(
        localStorage.getItem(`productsFavorite-${currentUserId}`)
    );
    if (favouritesProducts) {
        dispatch(favouritesReceived(favouritesProducts));
        dispatch(favouritesReceivedLength(favouritesProducts.length));
    }
};

export const getFavourites = () => (state) => state.favourites.entities;
export const getFavouritesAmount = () => (state) =>
    state.favourites.entitiesAmount;
export const getFavouritesById = (productId) => (state) => {
    if (state.favourites.entities) {
        return state.favourites.entities.find((u) => u._id === productId);
    }
};

export const toggleFavourite = (product) => (dispatch, getState) => {
    const currentUserId = getCurrentUserId()(getState());
    let currentUserFavourites = JSON.parse(
        localStorage.getItem(`productsFavorite-${currentUserId}`)
    );
    let indexOfFindedProduct;
    if (currentUserFavourites === null) {
        currentUserFavourites = [];
    } else if (currentUserFavourites.length > 0) {
        indexOfFindedProduct = currentUserFavourites.findIndex(
            (p) => p._id === product._id
        );
    }

    if (indexOfFindedProduct >= 0) {
        const newFavouriteProductsArray = currentUserFavourites.filter(
            (p) => p._id !== product._id
        );
        localStorage.setItem(
            `productsFavorite-${currentUserId}`,
            JSON.stringify(newFavouriteProductsArray)
        );
        dispatch(favouritesReceived(newFavouriteProductsArray));
        dispatch(favouritesReceivedLength(newFavouriteProductsArray.length));
    } else {
        currentUserFavourites.push(product);
        localStorage.setItem(
            `productsFavorite-${currentUserId}`,
            JSON.stringify(currentUserFavourites)
        );
        dispatch(favouritesReceived(currentUserFavourites));
        dispatch(favouritesReceivedLength(currentUserFavourites.length));
    }
};

export default favouritesReducer;
