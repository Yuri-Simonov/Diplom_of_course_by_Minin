import React from "react";

const Footer = () => {
    let newDate = new Date();
    let currentYear = newDate.getFullYear();

    return (
        <footer className="footer">
            <div className="footer__content container">
                2021 - {currentYear}. Все права защищены
            </div>
        </footer>
    );
};

export default Footer;
