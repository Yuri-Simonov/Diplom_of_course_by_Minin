import { createSlice, createAction } from "@reduxjs/toolkit";
import { getCurrentUserId } from "./users";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        entities: null,
        entitiesAmount: 0
    },
    reducers: {
        basketReceived: (state, action) => {
            state.entities = action.payload;
        },
        basketReceivedLength: (state, action) => {
            state.entitiesAmount = action.payload;
        },
        basketClean: (state) => {
            state.entities = null;
            state.entitiesAmount = 0;
        }
    }
});

const { reducer: basketReducer, actions } = basketSlice;
const { basketReceived, basketReceivedLength, basketClean } = actions;

const basketRequested = createAction("basket/basketRequested");

export const loadBasketList = () => (dispatch, getState) => {
    dispatch(basketRequested());
    const currentUserId = getCurrentUserId()(getState());
    const basketProducts = JSON.parse(
        localStorage.getItem(`productsBasket-${currentUserId}`)
    );
    if (basketProducts) {
        dispatch(basketReceived(basketProducts));
        dispatch(basketReceivedLength(basketProducts.length));
    }
};

export const getBasket = () => (state) => state.basket.entities;
export const getBasketAmount = () => (state) => state.basket.entitiesAmount;
export const getBasketById = (productId) => (state) => {
    if (state.basket.entities) {
        return state.basket.entities.find((u) => u._id === productId);
    }
};

export const clearBasketList = () => (dispatch, getState) => {
    const currentUserId = getCurrentUserId()(getState());
    localStorage.removeItem(`productsBasket-${currentUserId}`);
    dispatch(basketClean());
};
export const addProductsToBasketList =
    (product, amount = 1) =>
    (dispatch, getState) => {
        const currentUserId = getCurrentUserId()(getState());

        let currentUserBasket = JSON.parse(
            localStorage.getItem(`productsBasket-${currentUserId}`)
        );
        let indexOfFindedProduct;
        if (currentUserBasket === null) {
            currentUserBasket = [];
        } else if (currentUserBasket.length > 0) {
            indexOfFindedProduct = currentUserBasket.findIndex(
                (p) => p._id === product._id
            );
        }

        if (indexOfFindedProduct >= 0) {
            currentUserBasket[indexOfFindedProduct].value += amount;
            const newBasketProductsArray = [...currentUserBasket];
            localStorage.setItem(
                `productsBasket-${currentUserId}`,
                JSON.stringify(newBasketProductsArray)
            );
            dispatch(basketReceived(newBasketProductsArray));
            dispatch(basketReceivedLength(newBasketProductsArray.length));
        } else {
            currentUserBasket.push(product);
            localStorage.setItem(
                `productsBasket-${currentUserId}`,
                JSON.stringify(currentUserBasket)
            );
            dispatch(basketReceived(currentUserBasket));
            dispatch(basketReceivedLength(currentUserBasket.length));
        }
    };

// export const toggleBasket = (product) => (dispatch, getState) => {
//     const currentUserId = getCurrentUserId()(getState());
//     let currentUserBasket = JSON.parse(
//         localStorage.getItem(`productsBasket-${currentUserId}`)
//     );
//     let indexOfFindedProduct;
//     if (currentUserBasket === null) {
//         currentUserBasket = [];
//     } else if (currentUserBasket.length > 0) {
//         indexOfFindedProduct = currentUserBasket.findIndex(
//             (p) => p._id === product._id
//         );
//     }

//     if (indexOfFindedProduct >= 0) {
//         const newBasketProductsArray = currentUserBasket.filter(
//             (p) => p._id !== product._id
//         );
//         localStorage.setItem(
//             `productsFavorite-${currentUserId}`,
//             JSON.stringify(newBasketProductsArray)
//         );
//         dispatch(basketReceived(newBasketProductsArray));
//         dispatch(basketReceivedLength(newBasketProductsArray.length));
//     } else {
//         currentUserBasket.push(product);
//         localStorage.setItem(
//             `productsFavorite-${currentUserId}`,
//             JSON.stringify(currentUserBasket)
//         );
//         dispatch(basketReceived(currentUserBasket));
//         dispatch(basketReceivedLength(currentUserBasket.length));
//     }
// };

export default basketReducer;
