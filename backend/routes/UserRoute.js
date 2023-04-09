import express from "express";
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from "../controllers/Users.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.get('/users/', createUsers);
router.get('/users/:id', updateUsers);
router.get('/users/:id', deleteUsers);

export default router;