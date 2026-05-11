
import connectDB from './config/db.js'
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt"
import User from './models/userModel.js'

 const Admin_Password="admintemporarypassword"
const registerAdmin=async()=>{
  try {
    const ADMIN_EMAIL=process.env.ADMIN_EMAIL
    if(!ADMIN_EMAIL){
      console.log("missing env variable")
      process.exit(1)
    }
    await connectDB()
    const existingAdmin=await User.findOne({email:process.env.ADMIN_EMAIL})
    if(existingAdmin){
      console.log("Admin exist ",existingAdmin.role)
      process.exit(0)
    }
    const hashedPassword=await bcrypt.hash(Admin_Password,10)
    const admin =await User.create({
      email:process.env.ADMIN_EMAIL,
      password:hashedPassword,
      role:"ADMIN"
    })
    console.log("Admin created ")
    console.log("Admin created ",admin.email)
    console.log("Admin created ",hashedPassword)
    process.env(0)


  } catch (error) {
    console.log(error)
    
  }

}

registerAdmin()