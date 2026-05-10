import express from "express"
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controllers/employeeController.js"
const employeeRouter=express.Router()
employeeRouter.get('/',getEmployee)
employeeRouter.get('/',createEmployee)
employeeRouter.get('/:id',updateEmployee)
employeeRouter.get('/:id',deleteEmployee)
export default employeeRouter