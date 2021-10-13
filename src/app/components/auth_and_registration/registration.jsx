import React from "react";

const Registration = () => {
    return (
        <main className="shop authorization">
            <div className="container">
                <section className="authorization__body">
                    <h2 className="authorization__title title">Регистрация</h2>
                    <form action="#" className="authorization__form">
                        <input
                            type="text"
                            className="authorization__login"
                            placeholder="Логин"
                        />
                        <input
                            type="password"
                            className="authorization__password"
                            placeholder="Пароль"
                        />
                        <input
                            type="submit"
                            className="authorization__submit"
                            value="Зарегистрироваться"
                        />
                    </form>
                </section>
            </div>
        </main>
    );
};

export default Registration;
