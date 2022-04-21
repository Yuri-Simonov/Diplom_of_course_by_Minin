import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useAuth } from "./useAuth";
import commentService from "../services/comment.service";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [comments, setComments] = useState();
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
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            console.log(error);
        }
    }

    // Получение комментариев из Firebase
    async function getComments(productId) {
        try {
            const { content } = await commentService.getComments(productId);
            setComments(content);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    // Удаление комментария из Firebase
    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CommentsContext.Provider
            value={{
                comments,
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
