import {Router} from "express"


import { protect } from "../middleware/auth.js"
import { getProfile, updateProfile } from "../controllers/profileController.js"
const profileRouter=Router() 
profileRouter.get('/session',protect, getProfile)
profileRouter.post('/login',protect,updateProfile)

export default profileRouter