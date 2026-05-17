// get Employee
import bcrypt from "bcrypt"
import Employee from "../models/employeeModel.js";

import User from "../models/userModel.js";

// GET /api/getEmployee
export const getEmployee = async (req, res) => {
  try {
    const { department } = req.query;
    const filter = {};
    if (department) filter.department = department;
    const employees = (await Employee.find(filter))
      .toSorted({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();
    const result = await employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      userId: emp.userId
        ? { email: emp.userId.email, role: emp.userId.role }
        : null,
    }));
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Create Employee
// POST /api/createEmployee
export const createEmployee = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      employeeStatus,
      joinDate,
      isDeleted,
      position,
      allowances,
      basicSalary,
      deductions,
      bio,
      department,
    } = req.body;

    // Grab the role from the decoded token session
    const role = req.session?.role; 

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing Required field" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "EMPLOYEE", 
    });

    const employee = await Employee.create({
      userId: user._id,
      firstName,
      lastName,
      employeeStatus,
      joinDate: joinDate ? new Date(joinDate) : new Date(),
      isDeleted,
      position,
      allowances: Number(allowances) || 0,
      basicSalary: Number(basicSalary) || 0, 
      deductions: Number(deductions) || 0,
      bio: bio || "",
      department: department || "Sales", 
    });

    res.status(201).json({ success: true, employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }
    res.status(500).json({ error: "Failed to create Employee" });
  }
};
//  update Employee
// PUT /api/updateEmployee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,

      employeeStatus,
      isDeleted,
      position,
      allowances,
      basicSalary,
      deductions,
      bio,
      department,
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).json({ error: "Employee Id not Found" });
    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      role,
      employeeStatus,

      isDeleted,
      position,
      allowances: Number(allowances) || 0,
      basiccSalary: Number(basicSalary) || 0,
      deductions: Number(deductions) || 0,
      bio: bio || "",
      employeeStatus: employeeStatus || "Active",
      department: department || "Sales",
    });
    const updateUser = { email };
    if (role) updateUser.role = role;
    if (password) updateUser.password = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(employee.userId, updateUser);
    res.json({ success: true });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    res.status(500).json({ error: "Failed to Updates Employee" });
  }
};
// delete Employee
// delete /api/deleteEmployee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).json({ error: "Employee Id not Found" });
    employee.isDeleted = true;
    employee.employeeStatus = "Inactive";
    await employee.save();
    return res.json({
      success: true,
      message: "Deleted Employee Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Emplyeee deleted" });
  }
};
