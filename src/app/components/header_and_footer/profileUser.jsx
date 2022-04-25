import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BackLink from "../backLinkComponent/backLink";
import userDefaultImage from "./images/default-user.png";
import PropTypes from "prop-types";
import GlobalLoading from "../global_loading/global_loading";

const ProfileUser = ({ profileId }) => {
    const { currentUser, paramsUser, getParamsData } = useAuth(profileId);
    const [pageUser, setPageUser] = useState();

    useEffect(() => {
        getParamsData(profileId);
    }, [profileId]);

    function currentPerson(id) {
        if (id === currentUser._id) {
            return setPageUser(currentUser);
        } else {
            return setPageUser(paramsUser);
        }
    }
    useEffect(() => {
        currentPerson();
    }, [currentUser, paramsUser]);

    return (
        <>
            {pageUser ? (
                <main className="shop">
                    <div className="container">
                        <BackLink name="Вернуться к покупкам" />
                        <section className="profile">
                            <div className="profile__flex">
                                <article className="profile__flex-left">
                                    <img
                                        src={pageUser.img || userDefaultImage}
                                        alt="user"
                                    />
                                </article>
                                <article className="profile__flex-right">
                                    <div className="profile__item">
                                        <p className="profile__item-label">
                                            Имя пользователя:
                                        </p>
                                        <p className="profile__item-name">
                                            {pageUser.name}
                                        </p>
                                    </div>
                                    {pageUser.lastName.length > 0 && (
                                        <div className="profile__item">
                                            <p className="profile__item-label">
                                                Фамилия пользователя:
                                            </p>
                                            <p className="profile__item-name">
                                                {pageUser.lastName}
                                            </p>
                                        </div>
                                    )}

                                    <div className="profile__item">
                                        <p className="profile__item-label">
                                            На сайте с:
                                        </p>
                                        <p className="profile__item-name">
                                            {pageUser.registerDate}
                                        </p>
                                    </div>
                                    <div className="profile__item">
                                        <p className="profile__item-label">
                                            Оставил отзывов:
                                        </p>
                                        <p className="profile__item-name">
                                            {pageUser.amountReviews}
                                        </p>
                                    </div>
                                    {paramsUser._id === currentUser._id && (
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
