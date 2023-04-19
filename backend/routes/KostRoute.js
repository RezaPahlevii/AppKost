import express from "express";
import { getKost, getKostById, createKost, updateKost, deleteKost } from "../controllers/Kost.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/kost',verifyUser, getKost);
router.get('/kost/:id', verifyUser, getKostById);
router.post('/kost/',verifyUser, createKost);
router.patch('/kost/:id', verifyUser, updateKost);
router.delete('/kost/:id', verifyUser, deleteKost);

export default router;