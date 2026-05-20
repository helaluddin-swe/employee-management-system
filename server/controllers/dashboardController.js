// GET /api/dashboard
import { Department } from "../contraints/data.js";
import Attendance from "../models/attendanceModel.js";
import Employee from "../models/employeeModel.js";
import LeaveApplication from "../models/leaveApplication.js";
import Payslip from "../models/paySlipModel.js";

export const getDashboard = async (req, res) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized user context" });
    }
    
    const { role, userId } = req.user; 

    // --- ADMIN DASHBOARD FLOW ---
    if (role === "ADMIN") {
      const [totalEmployees, todayAttendance, pendingLeaves] = await Promise.all([
        Employee.countDocuments({ isDeleted: { $ne: true } }),
        Attendance.countDocuments({
          date: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(24, 0, 0, 0)),
          },
        }),
        LeaveApplication.countDocuments({ status: "PENDING" }),
      ]);

      return res.json({
        role: "ADMIN",
        totalEmployees, 
        todayAttendance, 
        totalDepartment: Department.length,
        pendingLeaves,
      });
      
    } else {
     
      const employee = await Employee.findOne({ userId }).lean();

      if (!employee) {
        return res.status(404).json({ error: "Employee profile not found" });
      }

      const today = new Date();
      const [currentMonthAttendance, pendingLeaves, latestPayslip] = await Promise.all([
        Attendance.countDocuments({
          employeeId: employee._id,
          date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
          },
        }),
        LeaveApplication.countDocuments({
          employeeId: employee._id,
          status: "PENDING",
        }),
        Payslip.findOne({ employeeId: employee._id })
          .sort({ createdAt: -1 })
          .lean(),
      ]);

      return res.json({
        role: "EMPLOYEE",
        employee: { ...employee, id: employee._id.toString() },
        currentMonthAttendance,
        pendingLeaves,
        latestPayslip: latestPayslip
          ? { ...latestPayslip, id: latestPayslip._id.toString() }
          : null,
      });
    }
  } catch (error) {
    console.error("Dashboard Error:", error); 
    return res.status(500).json({ error: "Failed to load dashboard data" });
  }
};