import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import KostRoute from "./routes/KostRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BioUserRoute from "./routes/BioUserRoute.js";
import fileUpload from "express-fileupload";
import Foto from "./models/FotoModel.js";
import Peraturan from "./models/PeraturanModel.js";
import KostPeraturan from "./models/KostPeraturanModel.js";
import Fasilitas from "./models/FasilitasModel.js";
import KostFasilitas from "./models/KostFasilitasModel.js";
import FasilitasUmum from "./models/FasilitasUmumModel.js";
import KostFasilitasUmum from "./models/KostFasilitasUmumModel.js";
import FasilitasKeamanan from "./models/FasilitasKeamananModel.js";
import KostFasilitasKeamanan from "./models/KostFasilitasKeamananModel.js";
import Spesifikasi from "./models/SpesifikasiModel.js";
import KostSpesifikasi from "./models/KostSpesifikasiModel.js";
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

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(KostRoute);
app.use(AuthRoute);
app.use(BioUserRoute);
app.use(Foto);
app.use(Peraturan);
app.use(KostPeraturan);
app.use(Fasilitas);
app.use(KostFasilitas);
app.use(FasilitasUmum);
app.use(KostFasilitasUmum);
app.use(FasilitasKeamanan);
app.use(KostFasilitasKeamanan);
app.use(Spesifikasi);
app.use(KostSpesifikasi);

// store.sync();

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server berjalan dengan baik..');
});