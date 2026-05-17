
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Loading from "../componenets/Loading"
import Sidebar from "../componenets/Sidebar"
const Layout = () => {
  const {user,loading}=useAuth()
  if(loading) return <Loading/>
  if(!user) return <Navigate to="/login"/>
  return (
    <div className="flex text-gray-900 h-screen ">
      <Sidebar/>

      <main className="flex-1 overflow-y-scroll">
        <div className="p-6 md:p-10 mx-auto pt-16 sm:pt-8 max-w-400 lg:p-12 ">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
