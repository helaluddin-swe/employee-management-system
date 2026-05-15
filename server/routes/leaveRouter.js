import {Router} from "express"

import { createLeave, getLeave, updateLeaveStatus } from "../controllers/leaveApplicationController.js"
import { protect, protectAdmin } from "../middleware/auth.js"
const leaveRouter=Router()
leaveRouter.get('/',protect,getLeave)
leaveRouter.post('/',protect,createLeave)
leaveRouter.patch('/:id',protect,protectAdmin,updateLeaveStatus)
export default leaveRouter