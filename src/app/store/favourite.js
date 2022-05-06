import { createSlice, createAction } from "@reduxjs/toolkit";
import { getCurrentUserId } from "./users";

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        entities: null,
        entitiesAmount: 0,
        error: null
    },
    reducers: {
        favouritesReceived: (state, action) => {
            state.entities = action.payload;
        },
        favouritesReceivedLength: (state, action) => {
            state.entitiesAmount = action.payload;
        },
        favouritesReceivedError: (state, action) => {},
        favouriteAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        favouriteRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: favouritesReducer, actions } = favouritesSlice;
const {
    favouritesReceived,
    favouritesReceivedLength,
    favouriteAdded,
    favouriteRemoved
    // favouritesReceivedError,
} = actions;

const favouritesRequested = createAction("favourites/favouritesRequested");
// const removeFavouriteRequested = createAction(
//     "favourites/removeFavouriteRequested"
// );
// const checkFavouriteRequested = createAction(
//     "favourites/checkFavouriteRequested"
// );

export const loadFavouritesList = () => (dispatch, getState) => {
    dispatch(favouritesRequested());
    const currentUserId = getCurrentUserId()(getState());
    const favouritesProducts = JSON.parse(
        localStorage.getItem(`productsFavorite-${currentUserId}`)
    );
    dispatch(favouritesReceived(favouritesProducts));
    dispatch(favouritesReceivedLength(favouritesProducts.length));
};

// export const getFavourites = () => (state) => state.favourites.entities;
// export const getFavouritesLoadingStatus = () => (state) =>
//     state.favourites.isLoading;

export const toggleFavourite = (product) => (dispatch, getState) => {
    console.log("product", product);
    const currentUserId = getCurrentUserId()(getState());
    const toggleProduct = `product-${product._id}-${currentUserId}`;
    if (localStorage.getItem(toggleProduct)) {
        localStorage.removeItem(toggleProduct);
        dispatch(favouriteRemoved(product));
    } else {
        localStorage.setItem(toggleProduct, JSON.stringify(product));
        dispatch(favouriteAdded(product));
    }
};
// export const removeFavourite = () => async (dispatch) => {};

// export function checkFavouritesAmount() {}

export default favouritesReducer;
