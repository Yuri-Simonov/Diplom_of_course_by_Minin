import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataLoaded, getIsLoggedIn, loadUsersList } from "../../store/users";
import GlobalLoading from "../global_loading/global_loading";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dataLoaded = useSelector(getDataLoaded());
    useEffect(() => {
        if (!dataLoaded) dispatch(loadUsersList());
    }, []);
    if (!dataLoaded) return <GlobalLoading />;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/authorization",
                                state: {
                                    from: props.location.pathname
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
