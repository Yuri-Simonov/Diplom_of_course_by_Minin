import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";
import { getCurrentUserId, updateCurrentUserData } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsReceivedError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsReceivedError,
    commentCreated,
    commentRemoved
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");
const checkCommentRequested = createAction("comments/checkCommentRequested");

export const loadCommentsList = (productId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(productId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsReceivedError(error));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(addCommentRequested());
    const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now(),
        userId: getCurrentUserId()(getState())
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
        dispatch(checkCommentsAmount());
    } catch (error) {
        dispatch(commentsReceivedError(error));
    }
};
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
            dispatch(checkCommentsAmount());
        }
    } catch (error) {
        dispatch(commentsReceivedError(error));
    }
};

export function checkCommentsAmount() {
    return async function (dispatch, getState) {
        dispatch(checkCommentRequested());
        try {
            const { content } = await commentService.fetchAll();
            if (content) {
                const amountComments = content.filter(
                    (elem) => elem.userId === getCurrentUserId()(getState())
                );
                dispatch(
                    updateCurrentUserData({
                        amountReviews: amountComments.length
                    })
                );
            } else {
                dispatch(
                    updateCurrentUserData({
                        amountReviews: 1
                    })
                );
            }
        } catch (error) {
            dispatch(commentsReceivedError(error));
        }
    };
}

export default commentsReducer;
