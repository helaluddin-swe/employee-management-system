import { Link } from "react-router-dom"
import LoginFormLeft from "../componenets/LoginFormLeft"

import {UserIcon,ShieldIcon, ArrowRightIcon} from "lucide-react"
const Login = () => {
  const portalOptions=[
    {
      to:"/login/admin",
      title:"Admin Portal",
      description:"Manage employee,departments,payroll,and system configurations",
      icon:ShieldIcon
    },
    {
      to:"/login/employee",
      title:"Employee Portal",
      description:"View Your profile,track attendance,request time off and access payslips",
      icon:UserIcon
    }
  ]
  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      <LoginFormLeft/>
      <div className="w-full md:w-1/2 flex-col items-center justify-center p-6 md:p-10 lg:p-16 overflow-y-auto relative min-h-screen ">
        <div className="w-full max-w-md animate-fade-in relative z-10"> 
          {/* header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">Welcome Back</h2>
            <p className="text-slate-500">Select Your Portal to securely access the system </p>
          </div>
          {/* portal list */}
          <div className="space-y-6">
          {portalOptions.map((portal)=>{
            <Link key={portal.to} to={portal.to} className="group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50">
              <h3>{portal.title}</h3>
              <ArrowRightIcon/>
            </Link>
          })}

          </div>
          {/* footer */}


        </div>
      </div>
      
    </div>
  )
}

export default Login
