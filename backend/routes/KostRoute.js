import express from "express";
import { getKost, getKostById, createKost, updateKost, deleteKost } from "../controllers/Kost.js";

const router = express.Router();

router.get('/kost', getKost);
router.get('/kost/:id', getKostById);
router.post('/kost/', createKost);
router.patch('/kost/:id', updateKost);
router.delete('/kost/:id', deleteKost);

export default router;