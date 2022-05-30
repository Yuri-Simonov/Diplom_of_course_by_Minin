import { createAction, createSlice } from "@reduxjs/toolkit";
import { generateAuthErrors } from "../../utils/generateAuthErrors";
import history from "../../utils/history";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          paramsUserData: null,
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          paramsUserData: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersReceivedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        usersRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        usersRequestedFailed: (state, action) => {
            state.error = action.payload;
        },
        usersUpdated: (state, action) => {
            const res = state.entities.findIndex((u) => {
                return u._id === action.payload._id;
            });
            state.entities[res] = action.payload;
        },
        userSignOut: (state) => {
            state.auth = null;
            state.isLoggedIn = false;
            state.dataLoaded = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersReceivedFailed,
    usersRequestedSuccess,
    usersRequestedFailed,
    usersUpdated,
    userSignOut
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const signIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(usersRequestedSuccess({ userId: data.userId }));
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthErrors(message);
                dispatch(usersRequestedFailed(errorMessage));
            } else {
                dispatch(usersRequestedFailed(error));
            }
        }
    };

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(usersRequestedSuccess({ userId: data.userId }));
        history.push("/products");
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthErrors(message);
            dispatch(usersRequestedFailed(errorMessage));
        } else {
            dispatch(usersRequestedFailed(error));
        }
    }
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersReceivedFailed(error));
    }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};
export const getCurrentUserData = () => (state) => {
    if (state.users.auth) {
        return state.users.entities.find(
            (u) => u._id === state.users.auth.userId
        );
    }
};
export const updateCurrentUserData = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const contentInner = await userService.update(payload);
        dispatch(usersUpdated(contentInner.content));
    } catch (error) {
        dispatch(usersRequestedFailed());
    }
};
export const getCurrentUserId = () => (state) => {
    if (state.users.auth) {
        return state.users.auth.userId;
    }
};
export const getUsersIsLoading = () => (state) => {
    return state.users.isLoading;
};
export const getIsLoggedIn = () => (state) => {
    return state.users.isLoggedIn;
};
export const getDataLoaded = () => (state) => {
    return state.users.dataLoaded;
};
export const signOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userSignOut());
    history.push("/products");
};

export const getParamsUser = (paramsId) => (state) => {
    return state.users.entities.find((u) => u._id === paramsId);
};
export const getAuthError = () => (state) => {
    return state.users.error;
};
export default usersReducer;
