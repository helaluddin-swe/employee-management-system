// get dashbaord for employe and admin
// GET /api/

import { Department } from "../contraints/data.js";
import Attendance from "../models/attendanceModel.js";
import Employee from "../models/employeeModel.js";
import LeaveApplication from "../models/leaveApplication.js";
import Payslip from "../models/paySlipModel.js";

export const getDashboard = async (req, res) => {
 try {
   const session = req.session;
  if (session.role === "ADMIN") {
    const [totalEmployees, todayAttendance, pendingLeaves] = await Promise.all([
      Employee.countDocument({ isDeleted: { $ne: true } }),
      LeaveApplication.countDocument({
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(24, 0, 0, 0)),
        },
      }),
      Attendance.countDocument({ status: "PENDING" }),
    ]);
    return res.json({
      role: "ADMIN",
      todayAttendance,
      todayAttendance,
      totalDepartment: Department.length,
      pendingLeaves,
    });
  } else {
    const employe = await Employee.findOne({
      userId: session.userId,
    }).lean();
    if (!employe) return res.status(404).json({ error: "not found employe" });

    const today = new Date();
    const [currentMonthAttendance, pendingLeaves, latestPayslips] =
      await Promise.all([
        Attendance.countDocument({
          employeeId: empoyee._id,
          date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
          },
        }),
        LeaveApplication.countDocument({
          employeeId: empoyee._id,
          status: "PENDING",
        }),
        Payslip.countDocument({
          employeeId: empoyee._id,
        })
          .sort({ createdAt: -1 })
          .lean(),
      ]);
    return res.json({
      role: "EMPLOYEE",
      employee: { ...employee, id: employe._id.toString() },
      currentMonthAttendance,
      pendingLeaves,
      latestPayslips: latestPayslips
        ? { ...latestPayslips, id: latestPayslips._id.toString() }
        : null,
    });
  }
  
 } catch (error) {
  return res.status(500).json({error:"Faild"})
  
 }
};
