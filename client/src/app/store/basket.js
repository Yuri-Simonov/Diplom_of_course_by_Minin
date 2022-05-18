import { createSlice, createAction } from "@reduxjs/toolkit";
import { getCurrentUserId } from "./users";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        entities: null,
        entitiesAmount: 0,
        totalSumOfOrder: 0
    },
    reducers: {
        basketReceived: (state, action) => {
            state.entities = action.payload;
        },
        basketReceivedLength: (state, action) => {
            state.entitiesAmount = action.payload;
        },
        basketReceivedLengthLess: (state, action) => {
            state.entitiesAmount -= action.payload;
        },
        basketClean: (state) => {
            state.entities = null;
            state.entitiesAmount = 0;
        },
        basketDeleteProductById: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload._id
            );
        },
        basketChangeTotalSum: (state, action) => {
            state.totalSumOfOrder = action.payload;
        }
    }
});

const { reducer: basketReducer, actions } = basketSlice;
const {
    basketReceived,
    basketReceivedLength,
    basketReceivedLengthLess,
    basketClean,
    basketDeleteProductById,
    basketChangeTotalSum
} = actions;

const basketRequested = createAction("basket/basketRequested");

export const loadBasketList = () => (dispatch, getState) => {
    dispatch(basketRequested());
    const currentUserId = getCurrentUserId()(getState());
    const basketProducts = JSON.parse(
        localStorage.getItem(`productsBasket-${currentUserId}`)
    );
    if (basketProducts) {
        dispatch(basketReceived(basketProducts));
        let result = 0;
        basketProducts.forEach((elem) => {
            result += elem.value;
        });
        dispatch(basketReceivedLength(result));
    }
};

export const getBasket = () => (state) => state.basket.entities;
export const getBasketAmount = () => (state) => state.basket.entitiesAmount;

export const clearBasketList = () => (dispatch, getState) => {
    const currentUserId = getCurrentUserId()(getState());
    localStorage.removeItem(`productsBasket-${currentUserId}`);
    dispatch(basketClean());
    dispatch(basketChangeTotalSum(0));
};
export const changeProductsToBasketList =
    (product, amount = 1, minus) =>
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
            if (minus) {
                currentUserBasket[indexOfFindedProduct].value -= amount;
                if (currentUserBasket[indexOfFindedProduct].value <= 0) {
                    currentUserBasket.splice(
                        currentUserBasket[indexOfFindedProduct],
                        1
                    );
                }
            } else {
                currentUserBasket[indexOfFindedProduct].value += amount;
            }
            localStorage.setItem(
                `productsBasket-${currentUserId}`,
                JSON.stringify(currentUserBasket)
            );
            dispatch(basketReceived(currentUserBasket));
            dispatch(basketReceivedLength(currentUserBasket.length));
        } else {
            currentUserBasket.push(product);
            localStorage.setItem(
                `productsBasket-${currentUserId}`,
                JSON.stringify(currentUserBasket)
            );
            dispatch(basketReceived(currentUserBasket));
        }
        let result = 0;
        currentUserBasket.forEach((elem) => {
            result += elem.value;
        });
        dispatch(basketReceivedLength(result));
        dispatch(
            basketChangeTotalSum(changeTotalSumOfOrder(currentUserBasket))
        );
    };

export const deleteBasketProductById = (product) => (dispatch, getState) => {
    const currentUserId = getCurrentUserId()(getState());
    const currentUserBasket = JSON.parse(
        localStorage.getItem(`productsBasket-${currentUserId}`)
    );
    const newCurrentUserBasket = currentUserBasket.filter(
        (p) => p._id !== product._id
    );
    localStorage.setItem(
        `productsBasket-${currentUserId}`,
        JSON.stringify(newCurrentUserBasket)
    );
    dispatch(basketDeleteProductById(product));
    dispatch(basketReceivedLengthLess(product.value));
    dispatch(basketChangeTotalSum(changeTotalSumOfOrder(currentUserBasket)));
};

function changeTotalSumOfOrder(arr) {
    let totalSum = 0;
    arr &&
        arr.forEach((element) => {
            totalSum += element.price * element.value;
        });
    return totalSum;
}
export const getTotalSumOfOrder = () => (state) => state.basket.totalSumOfOrder;

export default basketReducer;
