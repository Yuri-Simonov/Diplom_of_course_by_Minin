import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";
import UsersLoader from "../hoc/usersLoader";
import Products from "../products/products";
import ProfileEdit from "./profileEdit";
import ProfileUser from "./profileUser";

const Profile = () => {
    const params = useParams();
    const { profileId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <UsersLoader>
            {profileId ? (
                edit ? (
                    profileId === currentUserId ? (
                        <ProfileEdit />
                    ) : (
                        <Redirect to={`/profile/${currentUserId}/edit`} />
                    )
                ) : (
                    <ProfileUser profileId={profileId} />
                )
            ) : (
                <Products />
            )}
        </UsersLoader>
    );
};

export default Profile;
