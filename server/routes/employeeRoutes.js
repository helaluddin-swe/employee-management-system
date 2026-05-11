import express from "express"
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controllers/employeeController.js"
import { protect, protectAdmin } from "../middleware/auth.js"
const employeeRouter=express.Router()
employeeRouter.get('/',protect,protectAdmin, getEmployee)
employeeRouter.get('/',protect,protectAdmin,createEmployee)
employeeRouter.get('/:id',protect,protectAdmin,updateEmployee)
employeeRouter.get('/:id',protect,protectAdmin,deleteEmployee)
export default employeeRouter