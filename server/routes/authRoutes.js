import express from "express"
const authRouter=express.Router()
import { changePassword, login, session } from "../controllers/authController.js"
import { protect } from "../middleware/auth.js"
import { ipRateLimiter } from "../middleware/rateLimiter.js"

authRouter.post('/session',protect, session)
authRouter.post('/login',login)
authRouter.put('/change-password',protect,changePassword)
export default authRouter