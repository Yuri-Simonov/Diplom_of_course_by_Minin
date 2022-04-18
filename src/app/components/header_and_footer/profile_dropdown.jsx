import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import userDefaultImage from "./images/default-user.png";

const ProfileDropdown = () => {
    const { currentUser } = useAuth();

    const toggleDropdown = () => {
        const dropdownList = document.querySelector(".dropdown__list");
        dropdownList.classList.toggle("dropdown__list-active");
    };

    return (
        <div className="dropdown">
            <h2 className="dropdown__title" onClick={toggleDropdown}>
                <img src={currentUser.img || userDefaultImage} alt="user" />
                <span>{currentUser.name}</span>
            </h2>
            <div className="dropdown__list" onClick={toggleDropdown}>
                <Link
                    to={`/profile/${currentUser._id}`}
                    className="dropdown__list-link"
                >
                    Профиль
                </Link>
                <Link to={"/signout"} className="dropdown__list-link">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default ProfileDropdown;
