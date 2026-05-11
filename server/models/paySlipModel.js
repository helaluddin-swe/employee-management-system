import mongoose from "mongoose";
const PaySlipSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    basicSalary: { type: Number, default: 0,requied:true },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, requied:true },
  },
  { timestamps: true },
);


const Payslip =
  mongoose.model.Payslip || mongoose.model("Payslip", PaySlipSchema);
export default Payslip;
