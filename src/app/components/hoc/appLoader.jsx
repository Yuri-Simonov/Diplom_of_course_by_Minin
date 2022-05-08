import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsList } from "../../store/products";
import {
    getIsLoggedIn,
    getUsersIsLoading,
    loadUsersList
} from "../../store/users";
import GlobalLoading from "../global_loading/global_loading";
import { loadFavouritesList } from "../../store/favourite";
import { loadBasketList } from "../../store/basket";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const userIsLoading = useSelector(getUsersIsLoading());
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        dispatch(loadFavouritesList());
        dispatch(loadBasketList());
        dispatch(loadProductsList());
        dispatch(loadUsersList());
    }, [isLoggedIn]);
    if (userIsLoading) return <GlobalLoading />;
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AppLoader;
