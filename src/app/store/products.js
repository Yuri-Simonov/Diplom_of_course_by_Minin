import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true
    }
});
const { reducer: productsReducer } = productsSlice;

export default productsReducer;
