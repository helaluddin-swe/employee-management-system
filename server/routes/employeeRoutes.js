import express from "express"
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controllers/employeeController.js"
const employeeRouter=express.Router()
employeeRouter.get('/list',getEmployee)
employeeRouter.get('/add',createEmployee)
employeeRouter.get('/update',updateEmployee)
employeeRouter.get('/delete',deleteEmployee)
export default employeeRouter