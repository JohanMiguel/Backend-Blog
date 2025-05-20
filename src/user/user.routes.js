import { Router } from "express"
import {createUser } from "./user.controller.js"

const router = Router()

router.post("/createUser", createUser);

export default router