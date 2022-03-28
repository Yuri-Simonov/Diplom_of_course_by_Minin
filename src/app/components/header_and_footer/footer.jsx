import React from "react";

const Footer = () => {
    const newDate = new Date();
    const currentYear = newDate.getFullYear();

    return (
        <footer className="footer">
            <div className="footer__content container">
                2021 - {currentYear}. Все права защищены
            </div>
        </footer>
    );
};

export default Footer;
