import {Router} from "express"

import { changePassword, login, session } from "../controllers/authController.js"
import { protect } from "../middleware/auth.js"
const authRouter=Router()
authRouter.post('/session',protect, session)
authRouter.post('/login',protect,login)
authRouter.get('/change-password',protect,changePassword)
export default authRouter