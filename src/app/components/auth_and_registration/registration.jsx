import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validator } from "../../../utils/validator";
import Inputs from "./inputs";

const Registration = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState();
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
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
        console.log(data);
    };

    const getSubmittClasses = () => {
        return (
            "authorization__submit" +
            (!isValidValue ? " authorization__submit" + "-not-active" : "")
        );
    };

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
