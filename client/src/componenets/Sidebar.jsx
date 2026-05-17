import { BookAIcon, Calendar1Icon, DollarSignIcon, LayoutDashboard, MenuIcon, Settings2, User2, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import api from "../api/api";

const Sidebar = () => {
  const [user, setUser] = useState({ firstName: "User", lastName: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile");
        
        // Safe handling of response (whether it's full employee or fallback)
        const userData = res.data;
        
        setUser({
          firstName: userData.firstName || userData.name || "User",
          lastName: userData.lastName || "",
          fullName: userData.fullName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
        });
      } catch (error) {
        console.error("Profile fetch failed:", error);
        setUser({ firstName: "Guest", lastName: "" });
      }
    };

    fetchProfile();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const sidebarContent = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Attendance", path: "/attendance", icon: Calendar1Icon },
    { name: "Leave", path: "/leave", icon: BookAIcon },
    { name: "Payslips", path: "/payslips", icon: DollarSignIcon },
    { name: "Settings", path: "/settings", icon: Settings2 },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg p-3 rounded-2xl text-slate-700 hover:bg-gray-100 transition-all"
      >
        <MenuIcon size={24} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-20 md:w-64 bg-white border-r border-gray-200 
          overflow-y-auto transition-all duration-300 z-50 flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <User2 size={24} />
          </div>
          <div className="hidden md:block">
            <h2 className="font-bold text-xl">EMS</h2>
            <p className="text-xs text-gray-500 -mt-1">Management System</p>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-3 pt-6 space-y-1">
          {sidebarContent.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300
                ${isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "hover:bg-gray-100 text-gray-700 hover:translate-x-1"}`
              }
            >
              <item.icon size={22} />
              <span className="hidden md:block">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer - User Info */}
        <div className="p-5 border-t border-gray-200 mt-auto hidden md:block">
          <div className="text-sm text-gray-600">
            Welcome,{" "}
            <span className="font-semibold text-gray-800">
              {user.fullName || user.firstName}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;