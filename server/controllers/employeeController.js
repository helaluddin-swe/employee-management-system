

// get Employee

import Employee from "../models/employeeModel"

// GET /api/getEmployee
export const getEmployee=async(req,res)=>{
  try {
    const{department}=req.query 
    const filter={}
    if(department)filter.department=department
    const employees=(await Employee.find(filter)).toSorted({createdAt:-1}).populate("userId", "email role").lean()
    const result=await employees.map((emp)=>({
      ...emp,
      id:emp._id.toString(),
      userId:emp.userId? {email:emp.userId.email,role:emp.userId.role}:null
    }))
    res.status(200).json(result)

    
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error.message})
    
  }
}
// Create Employee
// POST /api/createEmployee
export const createEmployee=async(req,res)=>{
  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error.message})
    
  }
}
//  update Employee
// PUT /api/updateEmployee
export const updateEmployee=async(req,res)=>{
  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error.message})
    
  }
}
// delete Employee
// delete /api/deleteEmployee
export const deleteEmployee=async(req,res)=>{
  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error.message})
    
  }
}