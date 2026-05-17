
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Loading from "../componenets/Loading"
const Layout = () => {
  const {user,loading}=useAuth()
  if(loading) return <Loading/>
  if(!user) return <Navigate to="/login"/>
  return (
    <div className="flex  text-gray-900 h-screen ">
      <p >sidebar</p>

      <main className="flex-1 overflow-y-scroll">
        <div className="pt-20 px-12 max-w-400">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
