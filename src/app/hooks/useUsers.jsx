import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import GlobalLoading from "../components/global_loading/global_loading";
import { useErrors } from "./useErrors";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const { catcherError } = useErrors();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getUsers();
    }, []);
    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            catcherError(error);
        }
    }

    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : <GlobalLoading />}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
