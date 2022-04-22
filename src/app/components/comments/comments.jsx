import React, { useEffect } from "react";
import { useComments } from "../../hooks/useComments";
import AddCommentForm from "./addCommentForm";
import Comment from "./comment";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { orderBy } from "lodash";

const Comments = ({ productId }) => {
    const { currentUser } = useAuth();
    const { comments, createComment, getComments, removeComment } =
        useComments();
    const handleSubmit = (data, productId) => {
        createComment(data, productId);
    };

    // Сортировка комментариев
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    // Запрос данных по комментариям к FireBase при просмотре продукта
    useEffect(() => {
        getComments(productId);
    }, [productId]);

    return (
        <div className="comments">
            <h2 className="comments__title">Отзывы</h2>
            {sortedComments &&
                sortedComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        {...comment}
                        onRemove={removeComment}
                    />
                ))}
            {sortedComments && sortedComments.length === 0 && (
                <h2 className="comments__subtitle">
                    {currentUser
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
