import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useAuth } from "./useAuth";
import commentService from "../services/comment.service";
import userService from "../services/user.service";
import { useErrors } from "./useErrors";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
    const { catcherError } = useErrors();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState();
    const [commentsOfUser, setCommentsOfUser] = useState(0);
    // Глобальная блокировка
    const [isLoading, setLoading] = useState(true);

    // Создание комментария в Firebase
    async function createComment(data, productId) {
        const comment = {
            ...data,
            _id: nanoid(),
            productId: productId,
            created_at: Date.now(),
            userId: currentUser._id
        };
        try {
            const { content } = await commentService.createComment(comment);
            checkAmountComments();
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            catcherError(error);
        }
    }

    // Получение комментариев из Firebase
    async function getComments(productId) {
        try {
            const { content } = await commentService.getComments(productId);
            setComments(content);
        } catch (error) {
            catcherError(error);
        } finally {
            setLoading(false);
        }
    }
    // Удаление комментария из Firebase
    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                checkAmountComments();
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            catcherError(error);
        }
    }

    // Проверка количества комментариев
    async function checkAmountComments() {
        try {
            const { content } = await commentService.fetchAll();
            if (!isLoading && comments && currentUser) {
                const amountComments = content.filter(
                    (elem) => elem.userId === currentUser._id
                );
                await userService.update({
                    ...currentUser,
                    amountReviews: amountComments.length
                });
                setCommentsOfUser(amountComments.length);
            }
        } catch (error) {
            catcherError(error);
        }
    }

    useEffect(() => {
        checkAmountComments(comments);
    }, [isLoading]);

    return (
        <CommentsContext.Provider
            value={{
                comments,
                commentsOfUser,
                createComment,
                getComments,
                removeComment,
                isLoading
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CommentsProvider;
