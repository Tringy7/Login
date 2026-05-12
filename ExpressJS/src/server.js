import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import dotenv from "dotenv";

import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/configdb.js";

// config dotenv
dotenv.config();

const app = express();

// connect database
connectDB();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// CORS support for frontend requests
app.use((req, res, next) => {
    const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// csrf protection disabled
// const csrfProtection = csrf({
//     cookie: true
// });

// app.use(csrfProtection);

// view engine
viewEngine(app);

// routes
initWebRoutes(app);

// port
const port = process.env.PORT || 6969;

// start server
app.listen(port, () => {
    console.log(
        `Backend Nodejs is running on port: ${port}`
    );
});