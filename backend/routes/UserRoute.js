// import express from "express";
// import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from "../controllers/Users.js";
// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const express = require('express')
const { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } = require('../controllers/Users.js')
const { verifyUser, adminOnly } = require('../middleware/AuthUser.js')

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUsersById);
router.post('/users/', verifyUser, adminOnly, createUsers);
router.patch('/users/:id', verifyUser, adminOnly, updateUsers);
router.delete('/users/:id', verifyUser, adminOnly, deleteUsers);

// export default router;
module.exports = router;