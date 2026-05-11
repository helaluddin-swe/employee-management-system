import {Router} from "express"


import { getDashboard } from "../controllers/dashboardController.js"
const dashbaordRouter=Router()
dashbaordRouter.get('/',getDashboard)

export default  dashbaordRouter