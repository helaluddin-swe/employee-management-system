import Employee from "../models/employeeModel.js"


export const getProfile=async(req,res)=>{
  try {

    const session=rq.session
    const employee=await Employee.findOne({userId:session.userId})
    if(!employee){
      return res.json({
        firstName:"Admin",
        lastName:"",
        email:session.email
      })
    }
    return res.json(employee)

    
  } catch (error) {
    return res.status(500).json({error:"failed"})
    
  }
}

// update profile
export const updateProfile=async(req,res)=>{
  try {

    const session=req.session
     const employee=await Employee.findOne({userId:session.userId})
     if(!employee){
      return res.status(404).json({error:"employee not  found"})
     }
     if(employee.isDeleted){
      return res.status(403).json({error:"Deactivated account"})
     }
    await Employee.findByIdAndUpdate(employee._id,{
      bio:req.body.bio
    })
    return res.json({success:true})
    
  } catch (error) {
    return res.status(500).json({error:"failed to update profile"})
    
  }
}