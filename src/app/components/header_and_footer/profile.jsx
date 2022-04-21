import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Products from "../products/products";
import ProfileEdit from "./profileEdit";
import ProfileUser from "./profileUser";

const Profile = () => {
    const params = useParams();
    const { profileId, edit } = params;
    const { currentUser } = useAuth();
    return (
        <>
            {profileId ? (
                edit ? (
                    profileId === currentUser._id ? (
                        <ProfileEdit />
                    ) : (
                        <Redirect to={`/profile/${currentUser._id}/edit`} />
                    )
                ) : (
                    <ProfileUser profileId={profileId} />
                )
            ) : (
                <Products />
            )}
        </>
    );
};

export default Profile;
