import express from "express";
import { getKost, getKostById, createKost, updateKost, deleteKost, getRekomendasiKost, filterKostByFacilities, getKostView, getKostViewById, getKordinat } from "../controllers/Kost.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/rumah-kost',verifyUser, getKost);
router.get('/rumah-kost/:id', verifyUser, getKostById);
router.post('/rumah-kost/',verifyUser, createKost);
router.patch('/rumah-kost/:id', verifyUser, updateKost);
router.delete('/rumah-kost/:id', verifyUser, deleteKost);
router.get('/rekomendasi-kost', getRekomendasiKost);
router.get('/filter-kost', filterKostByFacilities);
router.get('/rumah-kost/detail', getKostView);
router.get('/rumah-kost/detail/:id', getKostViewById);
router.get('/maps', getKordinat);

export default router;