import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/users";
import GlobalLoading from "../global_loading/global_loading";

const SignOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signOut());
    }, []);
    return <GlobalLoading />;
};

export default SignOut;
