import React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import App from "./app/App";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "./app/store/createStore";
import history from "./utils/history";

const store = createStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
