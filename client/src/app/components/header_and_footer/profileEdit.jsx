import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUserData, updateCurrentUserData } from "../../store/users";
import Inputs from "../auth_and_registration/inputs";
import BackLink from "../backLinkComponent/backLink";
import userDefaultImage from "./images/default-user.png";

const ProfileEdit = () => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: currentUser.name || "",
        lastName: currentUser.lastName || "",
        _id: currentUser._id
    });
    const [errors, setErrors] = useState();
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newData = { ...data, name: data.name, lastName: data.lastName };
        try {
            dispatch(updateCurrentUserData(newData));
        } catch (error) {
            setErrors(error);
        }
    };

    const getSubmittClasses = () => {
        return (
            "authorization__submit" +
            (data.name.length < 3 ? " authorization__submit-not-active" : "")
        );
    };

    return (
        <main className="shop">
            <div className="container">
                <BackLink name="На страницу пользователя" />
                <section className="profile">
                    <div className="profile__flex">
                        <article className="profile__flex-left">
                            <img
                                src={currentUser.img || userDefaultImage}
                                alt="user"
                            />
                        </article>
                        <article className="profile__flex-right">
                            <form
                                action="put"
                                className="profile__form"
                                onSubmit={handleSubmit}
                            >
                                <div className="profile__item">
                                    <p className="profile__item-label">
                                        Ваше имя:
                                    </p>
                                    <Inputs
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        error={errors}
                                        messagePlaceholder="Введите ваше имя"
                                        classNameInput="profile__item-input authorization__email"
                                    />
                                </div>
                                <div className="profile__item">
                                    <p className="profile__item-label">
                                        Вашa фамилия:
                                    </p>
                                    <Inputs
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleChange}
                                        error={errors}
                                        messagePlaceholder="Введите вашу фамилию"
                                        classNameInput="profile__item-input authorization__email"
                                    />
                                </div>
                                {currentUser && (
                                    <div className="profile__item">
                                        <button
                                            type="submit"
                                            className={getSubmittClasses()}
                                            onClick={history.goBack}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                )}
                            </form>
                        </article>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProfileEdit;
