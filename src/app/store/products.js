import { createSlice } from "@reduxjs/toolkit";
import isOutDated from "../../utils/isOutDated";
import productsService from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        productsReceivedError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsReceivedError } = actions;

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutDated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productsService.get();
            dispatch(productsReceived(content));
        } catch (error) {
            dispatch(productsReceivedError(error));
        }
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductsError = () => (state) => state.products.error;
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export default productsReducer;
