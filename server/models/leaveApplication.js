import mongoose from "mongoose";
const leaveApplicationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    reason: { type: String, default: null },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: {
      type: String,
      enum: ["SICK", "CASUAL", "ANNUAL"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

const LeaveApplication =
  mongoose.model.LeaveApplication ||
  mongoose.model("LeaveApplication", leaveApplicationSchema);
export default LeaveApplication
