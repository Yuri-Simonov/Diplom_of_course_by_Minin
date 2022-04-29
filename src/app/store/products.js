import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true
    }
});

// console.log("productsSlice", productsSlice);

const { reducer: productsReducer } = productsSlice;

export default productsReducer;
