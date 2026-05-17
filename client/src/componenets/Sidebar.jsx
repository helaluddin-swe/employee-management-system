import { BookAIcon, Calendar1Icon, DollarSignIcon, LayoutDashboard, MenuIcon, Settings2, User2, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import api from "../api/api"
import { useAuth } from "../context/authContext"


const Sidebar = () => {
  const [userName, setUserName] = useState('')
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const pathName = useLocation()
  const {token}=useAuth()
  useEffect(() => {
    const userProfile = async () => {
      const res = await api.get("api/profile",{headers:{token}})
      setUserName(res.data)
    }
    userProfile()

  }, [])
  useEffect(() => {
    setIsMobileMenu(false)

  }, [pathName])

  const sidebarContent = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Attendance", path: "/attendance", icon: Calendar1Icon },
    { name: "Leave", path: "/leave", icon: BookAIcon },
    { name: "Payslips", path: "/payslips", icon: DollarSignIcon },
    { name: "Settings", path: "/settings", icon: Settings2 },
  ]
  return (
    <div className="fixed top-0 left-0 overflow-y-auto h-screen w-20 md:w-64 scrollbar-thin scrollbar-thumb-zinc-400 max-md:-translate-x-full max-md:open:translate-0 transition-all border-r border-gray-300">
      <div className="flex gap-4 ">
       
        <div className="flex"> <h2 className="p-6 border-b border-gray-200 text-md font-bold">EMS systems</h2>
          <button onClick={() => setIsMobileMenu(false)} className="text-slate-400 hover:text-white p-1 lg:hidden"><XIcon size={22} /></button></div>
      </div>
      {/* user prole */}
      <div>
        {userName && <div> {userName.firstName+ " "+ userName.lastName}</div>}
      </div>

      <div className="flex flex-col gap-4 pt-6">
        {sidebarContent.map((item, i) => (
          <NavLink key={i} to={item.path} >
            <div className="  hover:translate-x-2 transition-all duration-300  flex gap-2 py-2 px-2 rounded-md ">
              <item.icon className="" />
              <p className="hidden md:block font-semibold">{item.name}</p>
            </div>
          </NavLink>
        ))}
      </div>

      {/* desktop */}

    </div>

  )

}

export default Sidebar
