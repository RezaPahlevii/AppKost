import express from "express";
import { getBio, getBioById, createBio, updateBio, deleteBio } from "../controllers/BioUser.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/biodata-penyewa',verifyUser, getBio);
router.get('/biodata-penyewa/:id', verifyUser, getBioById);
router.post('/biodata-penyewa/',verifyUser, createBio);
router.patch('/biodata-penyewa/:id', verifyUser, updateBio);
router.delete('/biodata-penyewa/:id', verifyUser, deleteBio);

export default router;