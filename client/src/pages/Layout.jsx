
import { Outlet } from "react-router-dom"
const Layout = () => {
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
