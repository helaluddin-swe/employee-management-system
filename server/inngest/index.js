import { cron, Inngest } from "inngest";
import Attendance from "../models/attendanceModel.js";
import Employee from "../models/employeeModel.js";
import LeaveApplication from "../models/leaveApplication";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "fullstack-ems" });

const autoCheckOut = inngest.createFunction(
  { id: "auto-check-out"},{
    event:"employee/chekout"
   
  },
  async ({ event, step }) => {
    const {employeeId,attendanceId}=event.data
    await step.sleepUntill("Wait-for-9-Hours -almost",new Date(new Date().getTime()+9*60*60*1000))
    // get attendance data
    let attendance=await Attendance.findById(attendanceId)
    if(!attendance?.checkOut){
      // get employe data
      const employee=await Employee.findById(employeeId)
      // send reminder employee


      // wait for 10 hours as status "late"
      await step.sleepUntill("wait-for-the-1-hour",new Date(new Date().getTime()+1*60*60*1000))

      attendance=await Attendance.findById(attendanceId)
      if(!attendance?.checkOut){
        attendance.checkOut=new Date(attendance.checkIn).getTime()+4*60*60*1000
        attendance.workingHours=4
        attendance.dayType="Half Day"
        attendance.status="LATE"
        await attendance.save()

      }
    }

  },
);

const leaveApplicationReminder = inngest.createFunction(
  { id: "leave-appilcation-reminder"},{
    event:"leave/pending"
   
  },
  async({event,step})=>{
    const {leaveApplicationId}=event.data

    // wait for 24 hours
    await step.sleepUntill("wait-for-24-hours",new Date(new Date().getTime()+24*60*60*1000) )
    const leaveApplication=await LeaveApplication.findById(leaveApplicationId)
    if(leaveApplication?.status==="PENDING"){
      const employe=await Employee.findById(leaveApplication.employeeId)
      // send reminder email to admin to take action to leave application 

    }
  }
  
);

// check attendance at 11:30 AM IST and email absent employees

const attendanceReminderCorn = inngest.createFunction(
  { id: "attendance-reminder-corn"},{
    // time zone :11:30AM=6:00UTC
    cron:"0 0 6 * * *"    
  },
  async({step})=>{
//  step-1 get today date range 
 const today=await step.run("get-today-date",()=>{
  const startUTC=new Date(new Date().toLocaleString("en-CA",{timeZone:"Asia/Dhaka"})+"T00:00:00+05:30")
  const endUTC=new Date(startUTC.getTime()+24*60*60*1000)
  return {startUTC: startUTC.toISOString(),endUTC:endUTC.toISOString()}
 })
//  step-2 get all active ,non -deleted employees
const activeEmployees=await step.run("get-active-employyes",async()=>{
  const employees=await Employee.find({
    isDeleted:false,
    employementStatus:"ACTIVE"
  }).lean()
  return employees.map((e)=>({
    _id:e._id.toString(),firstName:e.firstName,lastName:e.lastName,email:e.email,department:e.department
  }))
})
// step-3 get employee id on approved leave today
 const onLeaveIds=await step.run("get-on-leave-ids",async()=>{
  const leaves=await LeaveApplication.find({
    status:"APPROVED",
    startDate:{$lte:new Date(today.endUTC)},
    endDate:{$gte:new Date(today.startUTC)},
  }).lean()
  return leaves.map((l)=>l.employeeId.toString())
 })
//  step-4 get employe ids who already checked in today 
const checkedInIds=await step.run("get-checked-in-ids",async()=>{
  const attendances=await Attendance.find({
    date:{$gte:new Date(today.startUTC),$lt:new Date(today.endUTC)}
  }).lean()
  return attendances.map((a)=>a.employeeId.toString())
})

// step 5 filter absent employess (not leaves and not checkin )

const absentEmployees=activeEmployees.filter((emp)=>
!onLeaveIds.inludes(emp._id)&& !checkedInIds.inludes(emp._id))

// step-06 send reminder email
if(absentEmployees.length>0){
  await step.run("send-remider-emails",async()=>{
    const emailPromises=absentEmployees.map((emp)=>{
      // send Email
    })
  })
}
return {totalActive:activeEmployees.length,onLeave:onLeaveIds.length,checkIn:checkedInIds.length,absent:absentEmployees.length}

    
  }
  
);

export const functions = [autoCheckOut,leaveApplicationReminder,attendanceReminderCorn];