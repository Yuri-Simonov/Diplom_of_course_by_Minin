import { useEffect, useState } from "react";

export const resizePage = () => {
    const [size, setSize] = useState([
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
    ]);

    const handleResize = () => {
        setSize([
            document.documentElement.clientWidth,
            document.documentElement.clientHeight
        ]);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [size]);

    return size;
};
