import { useEffect, useState } from "react"
import { dummyEmployeeData } from "../assets/assets"
import { Plus } from "lucide-react"


const Employee = () => {
  const [employees,setEmploees]=useState([])
  const [loading,setLoading]=useState(true)
  const fetchEmployees=()=>{
    setLoading(true)
    setEmploees(dummyEmployeeData)
    setTimeout(()=>{
   setLoading(false)
    },1000)

  }
  useEffect(()=>{
 fetchEmployees()
  },[])
  return (
    <div className="animate-fade-in">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1>Employees</h1>
          <p>Manage your tems members</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
        <Plus size={16}/>Add Employee
        </button>

      </div>
      {/* search bar */}
      <div>

      </div>
      {/* employye cards */}
      <div>

      </div>
    </div>
  )
}

export default Employee
