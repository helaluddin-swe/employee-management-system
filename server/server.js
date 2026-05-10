import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/db.js'
import employeeRouter from './routes/employeeRoutes.js'
const app=express()
dotenv.config()
const PORT=process.env.PORT
app.use(express.json())

connectDB()



app.use('/api/employee',employeeRouter)
app.get('/',(req,res)=>{
  res.send("API is Working....................")
})
app.listen(PORT,()=>{
  console.log(`server run on port http://localhost:${PORT}`)
})