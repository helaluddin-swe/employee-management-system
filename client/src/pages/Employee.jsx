import { useEffect, useState } from "react"
import { DEPARTMENTS, dummyEmployeeData } from "../assets/assets"
import { Plus, Search, X } from "lucide-react"
import EmployeeCard from "../componenets/EmployeeCard"

const Employee = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState("")
  const [editEmployee,setEidtEmployee]=useState(null)
  const [showcreateModel,setShowCreateModel]=useState(false)

  const fetchEmployees = () => {
    setLoading(true)
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectedDept ? emp.department === selectedDept : emp
      )
    )
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Trigger fetchEmployees whenever selectedDept changes
  useEffect(() => {
    fetchEmployees()
  }, [selectedDept])

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  const handleDelete=()=>{

  }
  const handleEdit=(e)=>{
    setEidtEmployee(e)
  }

  return (
    <div className="animate-fade-in p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-slate-500">Manage your team members</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={()=>setShowCreateModel(true)}>
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          {/* FIXED: changed transform-translate-y-1/2 to -translate-y-1/2 */}
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            placeholder="Search Employees"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-indigo-600"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full sm:max-w-40 p-2 border rounded-lg bg-white"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Cards */}
      <div>
        {loading ? (
          <div className="flex justify-center py-12">
            {/* FIXED: changed border-3 to border-4 */}
            <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.length === 0 ? (
             
              <p className="col-span-full text-center py-16 text-slate-500 bg-slate-50 rounded-2xl border border-dashed">
                No employee found
              </p>
            ) : (
              filtered.map((emp) => (
                <EmployeeCard key={emp._id} emp={emp} onDelete={handleDelete} onEdit={handleEdit}/>
              ))
            )}
          </div>
        )}
{/* create employee model */}
{showcreateModel && (
  <div className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4 overflow-auto" onClick={()=>setShowCreateModel(false)}> 
 <div className="fixed inset-0"/>
  <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e)=>e.stopPropagation()}>
    <div className="flex items-center justify-between p-6 pb-0">
      <div> 
        <h2 className="text-lg font-semibold to-slate-900">Add New Employee</h2>
        <p className="text-sm text-slate-500 mt-0.5">Create a user account and Employee</p>
        
         </div>
      <button onClick={()=>setShowCreateModel(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors to-slate-400 hover:to-slate-600">
  <X className="w-5 h-5"/>
      </button>

    </div>
    <div className="p-5">
      <form>
        form
      </form>

    </div>

  </div>
  
  </div>
)}


{/* edit employee modal */}


      </div>
    </div>
  )
}

export default Employee