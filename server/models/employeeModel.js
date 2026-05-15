import mongoose from "mongoose";
import { Department } from "../contraints/data.js"; 

const EmployeeSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Types.ObjectId, 
      ref: "User", 
      required: true, 
      unique: true 
    },
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: true 
    },
    employeeStatus: { 
      type: String, 
      enum: ["Active", "Inactive","Terminated"], 
      default: "Active" 
    },
    joinDate: { 
      type: Date, 
      required: true 
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
    position: { 
      type: String, 
      default: "" 
    },
    allowances: { 
      type: Number, 
      default: 0 
    },
    basicSalary: { 
      type: Number, 
      default: 0 
    },
    deductions: { 
      type: Number, 
      default: 0 
    },
    bio: { 
      type: String, 
      default: "" 
    },
    department: { 
      type: String, 
      enum: Department, 
      default: "Sales" 
    },
  },
  { timestamps: true }
);

// Fixed typo: mongoose.model -> mongoose.models
const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

export default Employee;