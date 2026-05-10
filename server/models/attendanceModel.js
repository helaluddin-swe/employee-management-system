import mongoose from "mongoose";
const AttendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    workingHours: { type: Number, default: null },
    checkOut: { type: Date, default: null },
    checIn: { type: Date, default: null },
    workingHours: { type: Number, default: null },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE"],
      default: "PRESENT",
    },
    dayType: {
      type: String,
      enum: ["Full Day", "Half Day", "Short Day", "Three Quarter Day", null],
      default: null,
    },
  },
  { timestamps: true },
);
AttendanceSchema.index(
  {
    employeeId: 1,
    date: 1,
  },
  { unique: true },
);

const Attendance =
  mongoose.model.Attendance || mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
