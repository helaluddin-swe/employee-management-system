import {Router} from "express"

import { createLeave, getLeave, updateLeaveStatus } from "../controllers/leaveApplicationController.js"
const leaveRouter=Router()
leaveRouter.get('/',getLeave)
leaveRouter.post('/',createLeave)
leaveRouter.patch('/:id',updateLeaveStatus)
export default leaveRouter