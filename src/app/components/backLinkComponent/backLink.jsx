import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const BackLink = ({ name }) => {
    const params = useParams();
    const { profileId } = params;

    const routeLinkBack =
        name === "Вернуться к покупкам" ? "/products" : `/profile/${profileId}`;

    return (
        <div className="back">
            <Link to={routeLinkBack} className="hover back-link">
                <svg
                    width="19"
                    height="12"
                    viewBox="0 0 19 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17 2V5H3.82998L6.70998 2.12C7.09998 1.73 7.09998 1.1 6.70998 0.709996C6.31998 0.319996 5.68998 0.319996 5.29998 0.709996L0.70998 5.3C0.31998 5.69 0.31998 6.32 0.70998 6.71L5.29998 11.3C5.68998 11.69 6.31998 11.69 6.70998 11.3C7.09998 10.91 7.09998 10.28 6.70998 9.89L3.82998 7H18C18.55 7 19 6.55 19 6V2C19 1.45 18.55 0.999996 18 0.999996C17.45 0.999996 17 1.45 17 2Z"
                        fill="white"
                    />
                </svg>
                <span>{name}</span>
            </Link>
        </div>
    );
};
BackLink.propTypes = {
    name: PropTypes.string
};

export default BackLink;
