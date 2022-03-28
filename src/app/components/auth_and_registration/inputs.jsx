import React, { useState } from "react";
import PropTypes from "prop-types";

const Inputs = ({
    type,
    onChange,
    value,
    error,
    classNameInput,
    messagePlaceholder,
    name
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <article>
            <input
                type={showPassword ? "text" : type}
                name={name}
                className={classNameInput}
                placeholder={messagePlaceholder}
                onChange={onChange}
                value={value}
            />
            {error && <p>{error[name]}</p>}
            {type === "password" && (
                <svg
                    className={
                        "authorization__password-eye" +
                        (showPassword
                            ? " authorization__password-eye-open"
                            : "")
                    }
                    onClick={toggleShowPassword}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21.257 10.962C21.731 11.582 21.731 12.419 21.257 13.038C19.764 14.987 16.182 19 12 19C7.81801 19 4.23601 14.987 2.74301 13.038C2.51239 12.7411 2.38721 12.3759 2.38721 12C2.38721 11.6241 2.51239 11.2589 2.74301 10.962C4.23601 9.013 7.81801 5 12 5C16.182 5 19.764 9.013 21.257 10.962V10.962Z"
                        stroke="black"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="black"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </article>
    );
};
Inputs.defaultProps = {
    type: "text"
};
Inputs.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    messagePlaceholder: PropTypes.string,
    classNameInput: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.object
};

export default Inputs;
