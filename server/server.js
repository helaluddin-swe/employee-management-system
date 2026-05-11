import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/db.js'
import employeeRouter from './routes/employeeRoutes.js'
import attendanceRouter from './routes/attendanceRoutes.js'
import leaveRouter from './routes/leaveRouter.js'
import payslipRouter from './routes/paySlipRoutes.js'
import dashbaordRouter from './routes/dashboardRoutes.js'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

import profileRouter from './routes/profileRoutes.js'
import authRouter from './routes/authRoutes.js'
const app=express()
dotenv.config()
const PORT=process.env.PORT
app.use(express.json())

connectDB()

app.use('/api/employee',employeeRouter)
app.use('/api/attendance',attendanceRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/payslips',payslipRouter)
app.use('/api/dashboard',dashbaordRouter)
app.use('/api/auth',authRouter)
app.use('/api/employees',employeeRouter)
app.use('/api/profile',profileRouter)
app.use("/api/inngest", serve({ client: inngest, functions }));
app.get('/',(req,res)=>{
  res.send("API is Working....................")
})
app.listen(PORT,()=>{
  console.log(`server run on port http://localhost:${PORT}`)
})