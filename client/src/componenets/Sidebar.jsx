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
    <div>
      {isMobileMenu && (<button onClick={()=>setIsMobileMenu(!isMobileMenu)}> <MenuIcon size={22}/></button>)}
     {sidebarContent.map((item,i)=>(
      <Link key={i} to={item.path} > 
       <div className="flex gap-2 items-center justify-center "> 
        <item.icon/>
        <p className="hidden md:block font-semibold">{item.name}</p>
       </div>
      </Link>
     ))}

      {/* desktop */}
      
    </div>
  )
}

export default Sidebar
