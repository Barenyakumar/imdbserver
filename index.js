const express = require("express")
const expressApp = require('./src/express-app');
const { databaseConnection } = require("./src/db");
require("dotenv").config();

const StartServer = async() => {
    const app = express();
    await expressApp(app);
    await databaseConnection();

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();

