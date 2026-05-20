import Employee from "../models/employeeModel.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// Get Employees (GET /api/employees)
export const getEmployee = async (req, res) => {
  try {
    const { department } = req.query;
    const filter = {};
    if (department) filter.department = department;

    const employees = await Employee.find(filter)
      .sort({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      userId: emp.userId
        ? { email: emp.userId.email, role: emp.userId.role }
        : null,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Employee (POST /api/employees)
export const createEmployee = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      employmentStatus,
      joinDate,
      position,
      allowances,
      basicSalary,
      deductions,
      bio,
      phone,
      department,
    } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required profile fields" });
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
      employmentStatus: employmentStatus || "ACTIVE",
      joinDate: joinDate ? new Date(joinDate) : new Date(),
      position,
      allowances: Number(allowances) || 0,
      basicSalary: Number(basicSalary) || 0, 
      deductions: Number(deductions) || 0,
      bio: bio || "",
      phone,
      department: department || "Sales", 
    });

    res.status(201).json({ success: true, employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to create Employee profile" });
  }
};

// Update Employee (PUT /api/employees/:id)
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email,           
      role,             // FIXED: Added role to destructuring
      password,         
      firstName,
      lastName,
      employmentStatus,
      position,
      allowances,
      basicSalary,
      deductions,
      phone,
      bio,
      department,
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee profile record not found" });
    }

    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      employmentStatus: employmentStatus || "ACTIVE",
      position,
      allowances: Number(allowances) || 0,
      basicSalary: Number(basicSalary) || 0, 
      deductions: Number(deductions) || 0,
      bio: bio || "",
      phone,
      department: department || "Sales",
    });

    const updateUser = {};
    if (email) updateUser.email = email;
    if (role) updateUser.role = role;
    if (password) updateUser.password = await bcrypt.hash(password, 10);
    
    if (Object.keys(updateUser).length > 0) {
      await User.findByIdAndUpdate(employee.userId, updateUser);
    }

    res.json({ success: true });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to update Employee records" });
  }
};

// Delete Employee (DELETE /api/employees/:id)
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee record not found" });
    }

    employee.isDeleted = true;
    employee.employmentStatus = "INACTIVE";
    await employee.save();

    return res.json({
      success: true,
      message: "Deactivated employee records successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to safely delete employee" });
  }
};