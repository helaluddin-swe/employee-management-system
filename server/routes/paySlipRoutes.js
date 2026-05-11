import {Router} from "express"

import { createPayslips, getPayslips, getPayslipsById } from "../controllers/paySlipController.js"
const payslipRouter=Router()
payslipRouter.get('/',getPayslips)
payslipRouter.post('/',createPayslips)
payslipRouter.patch('/:id',getPayslipsById)
export default payslipRouter