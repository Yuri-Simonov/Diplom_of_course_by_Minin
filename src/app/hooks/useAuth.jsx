import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import GlobalLoading from "../components/global_loading/global_loading";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useErrors } from "./useErrors";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const { catcherError } = useErrors();
    // console.log("process.env", process.env);
    const [currentUser, setCurrentUser] = useState();
    const [paramsUser, setParamsUser] = useState();
    // Глобальная блокировка
    const [isLoading, setLoading] = useState(true);

    // Регистрация
    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    // Вход в систему
    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD":
                        throw new Error("Email или пароль введены некорректно");
                    case "EMAIL_NOT_FOUND":
                        throw new Error("Email или пароль введены некорректно");

                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте позднее"
                        );
                }
            }
        }
    }

    // Выход из системы
    function signOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        // const currentURL = history.location.pathname;
        // history.push(currentURL);
        history.push("/products");
    }

    // Создание юзера
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            catcherError(error);
        }
    }

    // Обновление юзера
    async function updateUser(data) {
        try {
            const { content } = await userService.update(data);
            setCurrentUser(content);
        } catch (error) {
            catcherError(error);
        }
    }

    // Запрос данных текущего юзера
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            catcherError(error);
        } finally {
            setLoading(false);
        }
    }

    // Запрос данных другого пользователя по его id
    async function getParamsData(id) {
        try {
            const { content } = await userService.getParamsUser(id);
            setParamsUser(content);
        } catch (error) {
            catcherError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signUp,
                signIn,
                signOut,
                updateUser,
                getParamsData,
                paramsUser,
                currentUser
            }}
        >
            {!isLoading ? children : <GlobalLoading />}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
