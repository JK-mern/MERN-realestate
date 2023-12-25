import express from "express";
import { deleteUser, updateUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.put('/update/:id',verifyToken,updateUserInfo)
router.delete('/delete/:id',verifyToken,deleteUser)

export default router