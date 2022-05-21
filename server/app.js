const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDatabase = require("./startUp/initDatabase");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//     console.log("production");
// } else {
//     console.log("development");
// }

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDatabase();
        });
        await mongoose.connect(config.get("mongoUri"));
        console.log(chalk.blue("MongoDB started."));
        app.listen(PORT, () => {
            console.log(
                chalk.green(`Server has been statred on port ${PORT}.`)
            );
        });
    } catch (error) {
        console.log(chalk.red(error.message));
        precess.exit(1);
    }
}

start();
