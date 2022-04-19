import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BackLink from "../backLinkComponent/backLink";
import userDefaultImage from "./images/default-user.png";
import PropTypes from "prop-types";
import GlobalLoading from "../global_loading/global_loading";

const ProfileUser = ({ profileId }) => {
    const { currentUser, paramsUser, getParamsData } = useAuth(profileId);
    useEffect(() => {
        getParamsData(profileId);
    }, [profileId]);

    return (
        <>
            {paramsUser ? (
                <main className="shop">
                    <div className="container">
                        <BackLink name="Вернуться к покупкам" />
                        <section className="profile">
                            <div className="profile__flex">
                                <article className="profile__flex-left">
                                    <img
                                        src={paramsUser.img || userDefaultImage}
                                        alt="user"
                                    />
                                </article>
                                <article className="profile__flex-right">
                                    <div className="profile__item">
                                        <p className="profile__item-label">
                                            Имя пользователя:
                                        </p>
                                        <p className="profile__item-name">
                                            {paramsUser.name}
                                        </p>
                                    </div>
                                    <div className="profile__item">
                                        <p className="profile__item-label">
                                            Фамилия пользователя:
                                        </p>
                                        <p className="profile__item-name">
                                            {paramsUser.lastName}
                                        </p>
                                    </div>
                                    <div className="profile__item">
                                        <p className="profile__item-label">
                                            На сайте с:
                                        </p>
                                        <p className="profile__item-name">
                                            {paramsUser.date}
                                        </p>
                                    </div>
                                    <div className="profile__item">
                                        <p className="profile__item-label">
                                            Оставил отзывов:
                                        </p>
                                        <p className="profile__item-name">
                                            {paramsUser.amountReviews}
                                        </p>
                                    </div>
                                    {paramsUser._id === currentUser._id && (
                                        <div className="profile__item">
                                            <Link
                                                to={`/profile/${paramsUser._id}/edit`}
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
            ) : (
                <GlobalLoading />
            )}
        </>
    );
};
ProfileUser.propTypes = {
    profileId: PropTypes.string.isRequired
};

export default ProfileUser;
