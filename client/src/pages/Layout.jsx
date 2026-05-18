
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Loading from "../componenets/Loading"
import Sidebar from "../componenets/Sidebar"
const Layout = () => {
  const {user,loading}=useAuth()
  if(loading) return <Loading/>
  if(user==null) return <Navigate to="/login"/>
  return (
  <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 ml-0 transition-all duration-300">
        {/* Top Navbar (Optional) */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          {/* Your top bar content */}
        </nav>

        {/* Page Content */}
        <main className="p-6">
          {/* Your page content goes here */}
          <Outlet />   {/* if using React Router v6 */}
        </main>
      </div>
    </div>
  )
}

export default Layout
