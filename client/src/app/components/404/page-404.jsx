import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <main className="error">
            <article className="error-404">
                <h1>Ошибка 404</h1>
                <h2>Страница не найдена</h2>
                <Link to="/products">
                    <span className="error-return">
                        Вернуться на главную страницу
                    </span>
                </Link>
            </article>
        </main>
    );
};

export default PageNotFound;
