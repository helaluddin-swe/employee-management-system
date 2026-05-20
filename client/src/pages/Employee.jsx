import { useEffect, useState } from "react"
import { DEPARTMENTS, dummyEmployeeData } from "../assets/assets"
import { Plus, Search, X } from "lucide-react"
import EmployeeCard from "../componenets/EmployeeCard"
import EmployeeForm from "../componenets/EmployeeForm"

const Employee = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState("")
  // FIXED: Standardized spelling of state setter
  const [editEmployee, setEditEmployee] = useState(null)
  const [showCreateModel, setShowCreateModel] = useState(false)

  const fetchEmployees = () => {
    setLoading(true)
    // Simulating API loading feel nicely
    setTimeout(() => {
      setEmployees(
        dummyEmployeeData.filter((emp) =>
          selectedDept ? emp.department === selectedDept : emp
        )
      )
      setLoading(false)
    }, 600)
  }

  // Fetch data on component mount or when department filters update
  useEffect(() => {
    fetchEmployees()
  }, [selectedDept])

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const handleDelete = (id) => {
    // Implement delete logic here if needed
  }

  const handleEdit = (employee) => {
    setEditEmployee(employee)
  }

  return (
    <div className="animate-fade-in p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      
      {/* 1. DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage corporate accounts, roles, and employee records.</p>
        </div>
        <button 
          className="flex items-center gap-2 w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-blue-500/10 transition-colors" 
          onClick={() => setShowCreateModel(true)}
        >
          <Plus size={18} /> Add New Employee
        </button>
      </div>

      {/* 2. FILTERS & SEARCH ANCHOR */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            placeholder="Search by name, position, role..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-slate-800"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full sm:max-w-xs px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 shadow-sm transition-all cursor-pointer"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 3. DIRECTORY GRID CONTENT AREA */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin h-9 w-9 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-6">
                <p className="text-sm font-medium text-slate-500">No personnel records found matching your query.</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting your filters or correcting your search keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((emp) => (
                  <EmployeeCard key={emp._id} emp={emp} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. MODAL INSTANCES (REFACTORED CLEAN ROUTE) */}
      
      {/* A. Create Employee Modal */}
      {showCreateModel && (
        <div className="fixed bg-slate-900/40 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModel(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-auto animate-scale-up max-h-[calc(100vh-4rem)] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Register Employee Account</h2>
                <p className="text-xs text-slate-500 mt-0.5">Provision system profiles and complete operational files.</p>
              </div>
              <button onClick={() => setShowCreateModel(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <EmployeeForm 
                onSuccess={() => { setShowCreateModel(false); fetchEmployees(); }} 
                onCancel={() => setShowCreateModel(false)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* B. Edit Employee Modal */}
      {/* FIXED: Complete structural rewrite to eliminate duplicate JSX tags and clean up layout */}
      {editEmployee && (
        <div className="fixed bg-slate-900/40 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4" onClick={() => setEditEmployee(null)}>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-auto animate-scale-up max-h-[calc(100vh-4rem)] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Modify Employee Details</h2>
                <p className="text-xs text-slate-500 mt-0.5">Update configuration files and database schema data fields.</p>
              </div>
              <button onClick={() => setEditEmployee(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <EmployeeForm 
                initialData={editEmployee} 
                onSuccess={() => { setEditEmployee(null); fetchEmployees(); }} 
                onCancel={() => setEditEmployee(null)} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Employee