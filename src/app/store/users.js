import { createAction, createSlice } from "@reduxjs/toolkit";
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
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
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
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        userSignOut: (state) => {
            state.auth = null;
            state.isLoggedIn = false;
            state.dataLoaded = false;
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
    userCreated,
    userSignOut
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");

export const signIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(usersRequestedSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            dispatch(usersRequestedFailed(error));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(usersRequestedSuccess({ userId: data.localId }));
            dispatch(createUser({ _id: data.localId, email, ...rest }));
        } catch (error) {
            dispatch(usersRequestedFailed(error));
        }
    };

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.update(payload);
            dispatch(userCreated(content));
            history.push("/products");
        } catch (error) {
            dispatch(userCreateFailed());
        }
    };
}

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

export default usersReducer;
