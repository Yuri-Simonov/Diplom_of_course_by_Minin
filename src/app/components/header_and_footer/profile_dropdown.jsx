import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../store/users";
import userDefaultImage from "./images/default-user.png";

const ProfileDropdown = ({ userId }) => {
    const userById = useSelector(getUserById(userId));
    const toggleDropdown = () => {
        const dropdownList = document.querySelector(".dropdown__list");
        dropdownList.classList.toggle("dropdown__list-active");
    };

    return (
        <>
            <div className="dropdown">
                <h2 className="dropdown__title" onClick={toggleDropdown}>
                    <img
                        src={userById.img ? userById.img : userDefaultImage}
                        alt="user"
                    />
                    <span>{userById ? userById.name : "АНОНИМ !!!"}</span>
                </h2>
                <div className="dropdown__list" onClick={toggleDropdown}>
                    <Link
                        to={`/profile/${userId}`}
                        className="dropdown__list-link"
                    >
                        Профиль
                    </Link>
                    <Link to={"/signout"} className="dropdown__list-link">
                        Выйти
                    </Link>
                </div>
            </div>
        </>
    );
};
ProfileDropdown.propTypes = {
    userId: PropTypes.string.isRequired
};

export default ProfileDropdown;
