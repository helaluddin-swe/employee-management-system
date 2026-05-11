


// clock in/out for employee 

import { inngest } from "../inngest/index.js"
import Attendance from "../models/attendanceModel.js"
import Employee from "../models/employeeModel.js"

// POST /api/attendance 
export const clockInOut = async (req, res) => {
  try {
    const session = req.session
    const employee = await Employee.findOne({
      userId: session.userId
    })
    if (!employee) {
      return res.status(404).json({ error: "Employee not Found" })
    }
    if (employee.isDelelted) {
      return res.status(403).json({ error: "Your account is Deactivated,cannnot clock " })
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: today
    })
    const now = new Date()
    if (!existing) {
      const isLate = now.getHours() >= 9 && now.getMinutes() > 0
      const attendance = await Attendance.create({
        employeeId: employee._id,
        date: today,
        checkIn: now,
        status: isLate ? "LATE" : "PRESENT"
      })
      await inngest.send({
        name:"employe/check-out",
        data:{
          employeeId:employee._id,
          attendanceId:attendance._id
        }
      })
      return res.json({ success: true, type: "Check_IN", data: attendance })
    } else if (!existing.checkOut) {
      const checkInTime = new Date(existing.checkIn).getTime()
      const diffMs = now.getTime() - checkInTime
      const diffHours = diffMs / (60 * 60 * 1000)
      existing.checkOut = now

      // compute working hours and day typeconst 
      const workingHours = parseFloat(diffHours.toFixed(2))
      let dayType = "Half Day";
      if (workingHours >= 8) dayType = "Full Day";
      else if (workingHours >= 6) dayType = "Three Quarter Day";
      else if (workingHours >= 4) dayType = "Half Day";
      else dayType = "Short Day"
     
      existing.workingHours=workingHours
      existing.dayType=dayType
      await existing.save()
      return res.json({success:true,type:"CHECK_OUT",data:existing})
    } else{
       return res.json({success:true,type:"CHECK_OUT",data:existing})
    }
  } catch (error) {
    console.error("Attendance error",error)
    return res.status(500).json({error:"Operation Failed"})

  }

}

// get attendance for employee 
// GET /api/attendance 
export const getAttendance = async (req, res) => {
  try {
     const session = req.session
    const employee = await Employee.findOne({
      userId: session.userId
    })
    if (!employee) {
      return res.status(404).json({ error: "Employee not Found" })
    }
    const limit=parseFloat(req.query.limit || 30)
    const history=await Attendance.find({employeeId:employee._id}).sort({date:-1}).limit(limit)
    return res.json({
      data:history,
      employee:{isDeleted:employee.isDelelted}
    })
    
  } catch (error) {
    console.error("Attendance error",error)
    return res.status(500).json({error:"Operation Failed to get Attendance"})
  }

}