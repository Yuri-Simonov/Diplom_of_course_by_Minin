import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import GlobalLoading from "../global_loading/global_loading";

const SignOut = () => {
    const { signOut } = useAuth();
    useEffect(() => {
        signOut();
    }, []);
    return <GlobalLoading />;
};

export default SignOut;
