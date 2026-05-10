import mongoose from "mongoose";
import { Department } from "../contraints/data";
const EmployeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
  firstName: { type: String, requied: true },
  lastName: { type: String, requied: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  joinDate: { type: Date, required: true },
  isDeleted: { type: Boolean, required: false },
  bio: { type: String, default: "" },
  department: { type: String, enum: Department, default: "Sales" },

}, { timestamps: true })

const Employee = mongoose.model.Employee || mongoose.model('Employee', EmployeeSchema)
export default Employee