import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BackLink from "../backLinkComponent/backLink";
import userDefaultImage from "./images/default-user.png";
import PropTypes from "prop-types";

const ProfileUser = ({ profileId }) => {
    const { currentUser } = useAuth();
    console.log("profileId", profileId);

    return (
        <main className="shop">
            <div className="container">
                <BackLink name="Вернуться к покупкам" />
                <section className="profile">
                    <div className="profile__flex">
                        <article className="profile__flex-left">
                            <img
                                src={currentUser.img || userDefaultImage}
                                alt="user"
                            />
                        </article>
                        <article className="profile__flex-right">
                            <div className="profile__item">
                                <p className="profile__item-label">
                                    Имя пользователя:
                                </p>
                                <p className="profile__item-name">
                                    {currentUser.name}
                                </p>
                            </div>
                            <div className="profile__item">
                                <p className="profile__item-label">
                                    Фамилия пользователя:
                                </p>
                                <p className="profile__item-name">
                                    {currentUser.lastName}
                                </p>
                            </div>
                            <div className="profile__item">
                                <p className="profile__item-label">
                                    На сайте с:
                                </p>
                                <p className="profile__item-name">
                                    {currentUser.date}
                                </p>
                            </div>
                            <div className="profile__item">
                                <p className="profile__item-label">
                                    Оставил отзывов:
                                </p>
                                <p className="profile__item-name">
                                    {currentUser.amountReviews}
                                </p>
                            </div>
                            {currentUser && (
                                <div className="profile__item">
                                    <Link
                                        to={`/profile/${currentUser._id}/edit`}
                                        className="profile__item-edit"
                                    >
                                        Редактировать
                                    </Link>
                                </div>
                            )}
                        </article>
                    </div>
                </section>
            </div>
        </main>
    );
};
ProfileUser.propTypes = {
    profileId: PropTypes.string.isRequired
};

export default ProfileUser;
