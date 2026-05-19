// GET /api/dashboard
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
        totalEmployees, // Fixed: Added missing field for frontend
        todayAttendance, // Fixed: Removed duplicate
        totalDepartment: Department.length,
        pendingLeaves,
      });
    } else {
      // Fixed spelling to "employee" consistently
      const employee = await Employee.findOne({
        userId: session.userId,
      }).lean();

      if (!employee) return res.status(404).json({ error: "Employee not found" });

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
        // Fixed: Changed countDocuments to findOne to get the actual record object
        Payslip.findOne({ employeeId: employee._id })
          .sort({ createdAt: -1 })
          .lean(),
      ]);

      return res.json({
        role: "EMPLOYEE",
        employee: { ...employee, id: employee._id.toString() },
        currentMonthAttendance,
        pendingLeaves,
        // Fixed key name to singular "latestPayslip" to match frontend
        latestPayslip: latestPayslip
          ? { ...latestPayslip, id: latestPayslip._id.toString() }
          : null,
      });
    }
  } catch (error) {
    console.error(error); // Helpful for debugging
    return res.status(500).json({ error: "Failed to load dashboard data" });
  }
};