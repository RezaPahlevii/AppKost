import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import KostRoute from "./routes/KostRoute.js";
dotenv.config();

const app = express();

/**Genarate table otomatis di database kost_db */
// (async()=>{
//     await db.sync();
// }) ();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(KostRoute);

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server berjalan dengan baik..');
});