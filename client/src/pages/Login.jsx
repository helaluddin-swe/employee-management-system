import { Link, Navigate } from "react-router-dom"
import LoginFormLeft from "../componenets/LoginFormLeft"

import { UserIcon, ShieldIcon, ArrowRightIcon } from "lucide-react"
import { useAuth } from "../context/authContext"
import Loading from "../componenets/Loading"
const Login = () => {
  const {user,loading}=useAuth()
  if(loading) return <Loading/>
  if(!user) return <Navigate to="/dashboard"/>
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employee,departments,payroll,and system configurations",
      icon: ShieldIcon
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View Your profile,track attendance,request time off and access payslips",
      icon: UserIcon
    }
  ]
  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      <LoginFormLeft />
      <div className="w-full md:w-1/2 flex-col items-center justify-center p-6 md:p-10 lg:p-16 overflow-y-auto relative min-h-screen ">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/* header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">Welcome Back</h2>
            <p className="text-slate-500">Select Your Portal to securely access the system </p>
          </div>
          {/* portal list */}
          <div className="space-y-6">
            {portalOptions.map((portal) => (
              <Link key={portal.to} to={portal.to} className="group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 ">
                <div className="flex justify-between gap-4 items-center">
                  <h3 className="text-lg text-slate-800 group-hover:text-indigo-600 transition-colors ">{portal.title}</h3>
                  <ArrowRightIcon className="text-slate-600 group-hover:text-indigo-600 w-6 h-6 group-hover:translate-x-1 transition-all duration-300 " />
                </div>
              </Link>
            ))}

          </div>
          {/* footer */}
          <div className="text-center mt-12 text-sm md:text-left ">
            <p> @ {new Date().getFullYear()} DeveSpace.All right reserved</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
