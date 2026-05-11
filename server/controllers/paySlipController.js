

import Employee from "../models/employeeModel.js";
import Payslip from "../models/paySlipModel.js";
// CREATE payslip
// POST /api/payslips
export const createPayslips = async (req, res) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } =
      req.body;
    if (!employeeId || !basicSalary || !month || !year) {
      return res.status(404).json({ error: "Missing Fields" });
    }
    const netSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);
    const payslip = await Payslip.create({
      employeeId,
      month: Number(month),
      year: Number(year),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary,
    });
    return res.status(201).json({ success: true, data: payslip });
  } catch (error) {
    return res.status(500).json({ error: "Error" });
  }
};

// get payslips
// GET /api/payslips
export const getPayslips = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";
    if (isAdmin) {
      const payslips = await Payslip.find()
        .populate("employeeId")
        .sort({ createdAt: -1 });
      const data = payslips.map((p) => {
        const obj = p.toObject();
        return {
          ...obj,
          id: obj._id,
          employee: obj.employeeId.toString(),
          employeeId: obj.employeeId?._id?.toString(),
        };
      });
    } else {
      const employee = await Employee.findOne({ userId: session.userId });
      if (!employee)
        return res.status(404).json({ error: "Not Found employee payslip" });
      const data = await Employee.find({ employeeId: employee._id }).sort({
        createdAt: -1,
      });
      return res.json({ data: data });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error" });
  }
};

// get payslips by id
// get /api/payslips/:id
export const getPayslipsById = async (req, res) => {
  try {
    const payslip=await Payslip.findById(req.params.id).populate("employeeId").lean()
    const result={
      ...payslip,
      id:payslip._id.toString(),
      employee:payslip.employeeId

    }
    return res.json({data:result})

  } catch (error) {
    return res.status(500).json({ error: "Error" });
  }
};
