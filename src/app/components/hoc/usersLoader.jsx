import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataLoaded, loadUsersList } from "../../store/users";
import GlobalLoading from "../global_loading/global_loading";

const UsersLoader = ({ children }) => {
    const dispatch = useDispatch();
    const dataLoaded = useSelector(getDataLoaded());
    useEffect(() => {
        if (!dataLoaded) dispatch(loadUsersList());
    }, []);
    if (!dataLoaded) return <GlobalLoading />;
    return children;
};
UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UsersLoader;
