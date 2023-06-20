import express from "express";
import {getDetailKost, getDetailKostById, createDetailKost, updateDetailKost, deleteKost} from "../controllers/DetailKost.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/detail-rumah-kost', verifyUser, getDetailKost);
router.get('/detail-rumah-kost/:id', verifyUser, getDetailKostById);
router.post('/detail-rumah-kost/', verifyUser, createDetailKost);
router.patch('/detail-rumah-kost/:id', verifyUser, updateDetailKost);
router.delete('/detail-rumah-kost/:id', verifyUser, deleteKost);

export default router;