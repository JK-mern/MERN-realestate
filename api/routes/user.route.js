import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router()

router.use((req, res, next) => {
    next()
  })

router.get ('/test',test)

export default router