import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerDate } from "../../../utils/displayDate";
import { validator } from "../../../utils/validator";
import { getAuthError, getCurrentUserId, signUp } from "../../store/users";
import Inputs from "./inputs";

const Registration = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        registerDate: "",
        img: "",
        amountReviews: 0
    });
    const [errors, setErrors] = useState();

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const currentUserId = useSelector(getCurrentUserId());
    const signInError = useSelector(getAuthError());

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            minValue: {
                message: "Имя должно содержать не меньше 3 букв",
                value: 3
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message:
                    "Пароль должен содержать как минимум одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать как минимум одно число"
            },
            minValue: {
                message: "Пароль должен содержать как минимум 8 знаков",
                value: 8
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
        const nowDate = Date.now();
        const regDate = registerDate(parseInt(nowDate));
        const newData = {
            ...data,
            email: data.email,
            password: data.password,
            registerDate: regDate
        };
        dispatch(signUp(newData));
    };

    const getSubmittClasses = () => {
        return (
            "authorization__submit" +
            (!isValidValue ? " authorization__submit" + "-not-active" : "")
        );
    };

    // Переброс на главную страницу, если пользователь авторизован и хочет зайти на регистрацию
    if (currentUserId) {
        history.push("/");
    }

    return (
        <main className="shop authorization">
            <div className="container">
                <section className="authorization__body">
                    <h2 className="authorization__title title">Регистрация</h2>
                    <form
                        action="#"
                        className="authorization__form"
                        onSubmit={handleSubmit}
                    >
                        <Inputs
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors}
                            messagePlaceholder="Имя"
                            classNameInput="authorization__email"
                        />
                        <Inputs
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            error={errors}
                            messagePlaceholder="Фамилия"
                            classNameInput="authorization__email"
                        />
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
                        {signInError && (
                            <p className="authorization__error">
                                {signInError}
                            </p>
                        )}
                        <button className={getSubmittClasses()}>
                            Зарегистрироваться
                        </button>
                    </form>
                    <Link
                        to="/authorization"
                        className="authorization__registration hover"
                    >
                        Войти
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default Registration;
