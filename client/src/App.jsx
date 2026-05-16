import { Navigate, Route, Routes } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Employee from "./pages/Employee"
import Attendance from "./pages/Attendance"
import Leave from "./pages/Leave"
import Payslips from "./pages/Payslips"
import Settings from "./pages/Settings"
import Login from "./pages/Login"
import PrintPayslips from "./pages/PrintPayslips"
import LoginForm from "./componenets/LoginForm"


const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin"  element={<LoginForm role="admin" title="Admin Portal" subTitle="Access and Manage Your Organizations" />} />
        <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subTitle="Access and mangage your Employee Account" />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/dashboard" element={<Leave />} />
          <Route path="/dashboard" element={<Payslips />} />
          <Route path="/dashboard" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/print/payslips/:id" element={<PrintPayslips />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App
