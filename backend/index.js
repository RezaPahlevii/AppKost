// import express from "express";
// import cors from "cors";
// import session from "express-session";
// import dotenv from "dotenv";
// import db from "./config/Database.js";
// import SequelizeStore from "connect-session-sequelize";
// import UserRoute from "./routes/UserRoute.js";
// import KostRoute from "./routes/KostRoute.js";
// import AuthRoute from "./routes/AuthRoute.js";

const express = require('express')
const cors = require('cors')
const session = require('express-session')
const dotenv = require('dotenv')
const db = require('./config/Database.js')
const SequelizeStore = require('connect-session-sequelize')
const UserRoute = require('./routes/UserRoute.js')
const KostRoute = require('./routes/KostRoute.js')
const AuthRoute = require('./routes/AuthRoute.js')
const bodyParser = require('body-parser');
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

/**Genarate table otomatis di database kost_db */
// (async()=>{
//     await db.sync();
// }) ();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

// app.use(express.json());
app.use(bodyParser.json());
app.use(UserRoute);
app.use(KostRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server berjalan dengan baik..');
});