import express from "express";
import { getFasilitas, getFasilitasById, createFasilitas, updateFasilitas, deleteFasilitas } from "../controllers/FasilitasKost.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/fasilitas-kost',verifyUser, getFasilitas);
router.get('/fasilitas-kost/:id', verifyUser, getFasilitasById);
router.post('/fasilitas-kost/',verifyUser, createFasilitas);
router.patch('/fasilitas-kost/:id', verifyUser, updateFasilitas);
router.delete('/fasilitas-kost/:id', verifyUser, deleteFasilitas);

export default router;