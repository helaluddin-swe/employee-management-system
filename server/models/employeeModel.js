import mongoose from "mongoose";
import { Department } from "../contraints/data.js";
const EmployeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
  firstName: { type: String, requied: true },
  lastName: { type: String, requied: true },
  employeeStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  joinDate: { type: Date, required: true },
  isDeleted: { type: Boolean, required: false },
  position: { type: String, default: "" },
  allowances: { type:Number, default: 0 },
  basicSalary: { type: Number, default: 0 },
  deductions: { type: Number, default:0 },
  bio: { type: String, default: "" },
  department: { type: String, enum: Department, default: "Sales" },

}, { timestamps: true })

const Employee = mongoose.model.Employee || mongoose.model('Employee', EmployeeSchema)
export default Employee