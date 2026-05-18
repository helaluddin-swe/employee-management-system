import express from "express"
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controllers/employeeController.js"
import { protect, protectAdmin } from "../middleware/auth.js"
import { userRateLimiter } from "../middleware/rateLimiter.js"
const employeeRouter=express.Router()
employeeRouter.get('/',protect,protectAdmin, getEmployee)
employeeRouter.post('/',protect,protectAdmin,createEmployee)
employeeRouter.post('/:id',protect,protectAdmin,updateEmployee)
employeeRouter.delete('/:id',protect,protectAdmin,deleteEmployee)
export default employeeRouter 