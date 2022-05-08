import React from "react";
import config from "../../config.json";
import mockData from "../../mockData/mockData";

const Initialize = () => {
    const { error, initialize, progress, status } = mockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <main className="initialize">
            <div className="container">
                <div className="initialize__body">
                    <h1 className="initialize__title">
                        Страница инициализации данных
                    </h1>
                    <h3 className="initialize__subtitle">
                        Инициализация данных
                        {config.isFireBase ? "в FireBase" : "на сервер"}
                    </h3>
                    <ul>
                        <li>Статус: {status}</li>
                        <li>Прогресс: {progress}%</li>
                        {error && (
                            <li className="initialize__error">
                                Ошибка: {error}
                            </li>
                        )}
                    </ul>
                    <button className="initialize__btn" onClick={handleClick}>
                        Инициализировать
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Initialize;
