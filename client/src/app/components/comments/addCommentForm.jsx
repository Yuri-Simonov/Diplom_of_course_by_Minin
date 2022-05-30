import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const AddCommentForm = ({ onSubmit, productId }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const [data, setData] = useState({});

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // Отправка комментария
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data, productId);
        clearForm();
    };
    // Очитска формы после отправки комментария
    const clearForm = () => {
        setData({});
    };
    // Валидация класса на отправку комментария
    const getSubmitComment = () => {
        return (
            "comments__add-submit" +
            (data.content ? " comments__add-submit-active" : "")
        );
    };

    return (
        <>
            {currentUserId && (
                <article className="comments__add">
                    <form className="comments__add-form">
                        <textarea
                            name="content"
                            id="comment"
                            placeholder="Написать отзыв"
                            className="comments__add-textarea"
                            onChange={handleChange}
                            value={data.content || ""}
                        ></textarea>
                        <button
                            type="button"
                            className={getSubmitComment()}
                            onClick={handleSubmit}
                        >
                            Опубликовать
                        </button>
                    </form>
                </article>
            )}
        </>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func,
    productId: PropTypes.string.isRequired
};

export default AddCommentForm;
