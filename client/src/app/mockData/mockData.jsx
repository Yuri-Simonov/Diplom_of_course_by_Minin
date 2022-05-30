import { useEffect, useState } from "react";
import products from "./products.json";
import httpService from "../services/http.service";

const mockData = () => {
    const statusConsts = {
        idle: "Не начато",
        pending: "В процессе...",
        successed: "Готово",
        error: "Произошла ошибка"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = products.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);
    async function initialize() {
        try {
            for (const prod of products) {
                await httpService.put("products/" + prod._id, prod);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};

export default mockData;
