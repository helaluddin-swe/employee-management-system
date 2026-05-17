import Employee from "../models/employeeModel.js"


export const getProfile = async (req, res) => {
  try {
    // Safety check for session
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ 
        error: "Unauthorized - No session found" 
      });
    }

    const employee = await Employee.findOne({ 
      userId: req.session.userId 
    }).select("-password -__v"); 

    if (!employee) {
      // Return fallback for admin or new user
      return res.json({
        firstName: "Admin",
        lastName: "",
        email: req.session.email || "admin@ems.com",
        role: "Admin",
        isAdmin: true
      });
    }

    return res.json({
      ...employee.toObject(),
      fullName: `${employee.firstName || ''} ${employee.lastName || ''}`.trim()
    });

  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ 
      error: "Failed to fetch profile",
      message: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

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