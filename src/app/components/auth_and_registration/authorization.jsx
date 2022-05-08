import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { validator } from "../../../utils/validator";
import { getAuthError, getCurrentUserId, signIn } from "../../store/users";
import Inputs from "./inputs";

const Authorization = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        rememberMe: true
    });
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    const [errors, setErrors] = useState();
    const signInError = useSelector(getAuthError());
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleChangeBoolean = () => {
        setData((prevState) => ({
            ...prevState,
            rememberMe: !data.rememberMe
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };

    let isValidValue = false;
    if (errors && Object.keys(errors).length === 0) {
        isValidValue = true;
    }
    useEffect(() => {
        validate();
    }, [data]);
    /* eslint no-unreachable-loop: ["error", { "ignore": ["ForInStatement", "ForOfStatement"] }] */
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from
            : "/products";
        dispatch(signIn({ payload: data, redirect }));
    };

    const getSubmittClasses = () => {
        return (
            "authorization__submit" +
            (!isValidValue || signInError
                ? " authorization__submit" + "-not-active"
                : "")
        );
    };

    // Переброс на главную страницу, если пользователь авторизован и хочет зайти на авторизацию
    if (currentUserId) {
        history.push("/");
    }

    return (
        <main className="shop authorization">
            <div className="container">
                <section className="authorization__body">
                    <h2 className="authorization__title title">Авторизация</h2>
                    <form
                        action="#"
                        className="authorization__form"
                        onSubmit={handleSubmit}
                    >
                        <Inputs
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors}
                            messagePlaceholder="Email"
                            classNameInput="authorization__email"
                        />
                        <Inputs
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors}
                            messagePlaceholder="Password"
                            classNameInput="authorization__password"
                        />

                        <label htmlFor="rememberMe">
                            <input
                                name="rememberMe"
                                type="checkbox"
                                id="rememberMe"
                                value=""
                                checked={data.rememberMe}
                                onChange={handleChangeBoolean}
                                className="authorization__form-checkbox-real"
                            />
                            <span className="authorization__form-checkbox-fake">
                                <svg
                                    width="15"
                                    height="13"
                                    viewBox="0 0 15 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 1L4 11.01L1 8.01"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span className="authorization__form-checkbox-text">
                                Запомнить меня
                            </span>
                        </label>
                        {signInError && (
                            <p className="authorization__error">
                                {signInError}
                            </p>
                        )}
                        <button type="submit" className={getSubmittClasses()}>
                            Войти
                        </button>
                    </form>
                    <Link
                        to="/registration"
                        className="authorization__registration hover"
                    >
                        Зарегистрироваться
                    </Link>
                    <Link
                        to="/registration"
                        className="authorization__registration hover"
                    >
                        Забыли пароль?
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default Authorization;
