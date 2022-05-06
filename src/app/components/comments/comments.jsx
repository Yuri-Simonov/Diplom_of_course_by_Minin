import React, { useEffect } from "react";
import AddCommentForm from "./addCommentForm";
import Comment from "./comment";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";

const Comments = ({ productId }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const comments = useSelector(getComments());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(productId));
    }, []);
    const isLoading = useSelector(getCommentsLoadingStatus());

    const handleRemoveComment = (commentId) => {
        dispatch(removeComment(commentId));
    };
    const handleSubmit = (data, productId) => {
        dispatch(createComment({ ...data, productId: productId }));
    };

    // Сортировка комментариев
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <div className="comments">
            <h2 className="comments__title">Отзывы</h2>
            {!isLoading &&
                sortedComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        {...comment}
                        onRemove={handleRemoveComment}
                    />
                ))}
            {!isLoading && sortedComments.length === 0 && (
                <h2 className="comments__subtitle">
                    {currentUserId
                        ? "Еще никто не оставил отзыв о товаре. Будьте первым!"
                        : "Еще никто не оставил отзыв о товаре..."}
                </h2>
            )}
            <AddCommentForm onSubmit={handleSubmit} productId={productId} />
        </div>
    );
};
Comments.propTypes = {
    productId: PropTypes.string.isRequired
};
export default Comments;
