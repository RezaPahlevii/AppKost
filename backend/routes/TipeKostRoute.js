import express from "express";
import { getTipeKost, getTipeKostById, createTipeKost, updateTipeKost, deleteTipeKost } from "../controllers/TipeKost.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/tipe-rumah-kost', verifyUser, getTipeKost);
router.get('/tipe-rumah-kost/:id', verifyUser, getTipeKostById);
router.post('/tipe-rumah-kost/', verifyUser, createTipeKost);
router.patch('/tipe-rumah-kost/:id', verifyUser, updateTipeKost);
router.delete('/tipe-rumah-kost/:id', verifyUser, deleteTipeKost);


export default router;