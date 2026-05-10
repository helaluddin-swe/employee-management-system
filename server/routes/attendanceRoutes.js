import {Router} from "express"
import { clockInOut, getAttendance } from "../controllers/attendanceController"
const attendanceRouter=Router()
attendanceRouter.post('/',clockInOut)
attendanceRouter.get('/',getAttendance)
export default attendanceRouter