import express from "express";
import { getKost, getKostById, createKost, updateKost, deleteKost } from "../controllers/Kost.js";

const router = express.Router();

router.get('/kost', getKost);
router.get('/kost/:id', getKostById);
router.get('/kost/', createKost);
router.get('/kost/:id', updateKost);
router.get('/kost/:id', deleteKost);

export default router;