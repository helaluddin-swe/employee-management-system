import { BookAIcon, Calendar1Icon, DollarSignIcon, LayoutDashboard, MenuIcon, Settings2 } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"


const Sidebar = () => {
  const [userName,setUserName]=useState('')
  const [isMobileMenu,setIsMobileMenu]=useState(false)
  const pathName=useLocation()

  const sidebarContent=[
    {name:"Dashboard",path:"/employee/dashboard", icon:LayoutDashboard},
    {name:"Attendance",path:"/employee/attendance", icon:Calendar1Icon},
    {name:"Leave",path:"/employee/leave", icon:BookAIcon},
    {name:"Payslips",path:"/employee/payslips", icon:DollarSignIcon},
    {name:"Settings",path:"/employee/settings", icon:Settings2},
  ]
  return (
    <div className="fixed top-0 left-0 overflow-y-auto h-screen w-20 md:w-64 scrollbar-thin scrollbar-thumb-zinc-400 max-md:-translate-x-full max-md:open:translate-0 transition-all ">
      <h2 className="p-6 border-b border-gray-200">EMS systems</h2>
      <div className="flex flex-col gap-4 pt-6"> 
     {sidebarContent.map((item,i)=>(
      <Link key={i} to={item.path} > 
       <div className=" hover:bg-gray-100 hover:translate-x-2 transition-all duration-300 active:bg-blue-600 active:text-white active:font-semibold flex gap-2 py-2 px-2 rounded-md "> 
        <item.icon className=""/>
        <p className="hidden md:block font-semibold">{item.name}</p>
       </div>
      </Link>
     ))}
     </div>

      {/* desktop */}
      
    </div>
  )
}

export default Sidebar
