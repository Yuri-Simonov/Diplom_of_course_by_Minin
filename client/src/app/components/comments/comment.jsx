import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../store/users";

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const currentUserId = useSelector(getCurrentUserId());

    const user = useSelector(getUserById(userId));

    const sliceLastame = (lastname) => {
        if (lastname) {
            return lastname.slice(0, 1).toUpperCase() + ".";
        }
    };
    const toUpperFirstLetter = (name) => {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1);
        }
    };

    return (
        <>
            <article className="comments__item">
                <div className="comments__item-flex">
                    <div className="comments__item-avatar">
                        <img src="/img/users/default-user.png" alt="avatar" />
                    </div>
                    <div className="comments__item-content">
                        <div className="comments__item-header">
                            <p className="comments__item-name">
                                <span>{toUpperFirstLetter(user.name)}</span>
                                <span>{sliceLastame(user.lastName)}</span>
                            </p>
                            <p className="comments__item-date">
                                {displayDate(created)}
                            </p>
                        </div>
                        <div className="comments__item-comment">
                            <p className="comments__item-text">{content}</p>
                        </div>
                    </div>
                </div>
                {currentUserId === userId && (
                    <div
                        className="comments__item-close"
                        onClick={() => onRemove(id)}
                    >
                        <svg
                            width="27"
                            height="24"
                            viewBox="0 0 27 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                y="22.6484"
                                width="34.4826"
                                height="1"
                                rx="0.5"
                                transform="rotate(-41.057 0 22.6484)"
                                fill="white"
                            />
                            <rect
                                width="34.4826"
                                height="1"
                                rx="0.5"
                                transform="matrix(-0.754056 -0.65681 -0.65681 0.754056 26.6582 22.6484)"
                                fill="white"
                            />
                        </svg>
                    </div>
                )}
            </article>
        </>
    );
};
Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};
export default Comment;
