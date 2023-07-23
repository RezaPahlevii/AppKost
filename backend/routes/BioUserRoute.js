import express from "express";
import { getBioUsers, getBioUsersById, createBioUsers, updateBioUsers, deleteBioUsers } from "../controllers/BioUser.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/biodata',verifyUser, getBioUsers);
router.get('/biodata/:id', verifyUser, getBioUsersById);
router.post('/biodata/',verifyUser, createBioUsers);
router.patch('/biodata/:id', verifyUser, updateBioUsers);
router.delete('/biodata/:id', verifyUser, deleteBioUsers);

export default router;