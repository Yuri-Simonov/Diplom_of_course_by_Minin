import React, { useContext } from "react";
import PropTypes from "prop-types";

const ErrorsContext = React.createContext();

export const useErrors = () => {
    return useContext(ErrorsContext);
};

const ErrorsProvider = ({ children }) => {
    const body = document.querySelector("body");

    const catcherError = (error) => {
        const errorElement = document.createElement("div");
        errorElement.className = "error-modal";
        errorElement.textContent = error;
        body.append(errorElement);
        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    };

    return (
        <ErrorsContext.Provider value={{ catcherError }}>
            {children}
        </ErrorsContext.Provider>
    );
};

ErrorsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ErrorsProvider;
