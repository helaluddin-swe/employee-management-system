import { PencilIcon, Trash2Icon } from "lucide-react"


const EmployeeCard = ({emp,onDelete,onEdit}) => {
  const handleDelete=()=>{
    if(!confirm("Are you sure to delete this employee? "))
      return
  }
  return (
    <div  className="p-4 group relative card card-hover overflow-hidden border rounded-xl shadow-sm bg-white">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br fill-slate-100 to-slate-50"> 
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
            <span className="text-2xl font-medium text-indigo-400">
              {emp.firstName[0]} {emp.lastName[0]}
            </span>

          </div>
        </div>
      </div>
      
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-600 rounded-lg shadow-sm">{emp.department || "Remote"}</span>
        {emp.isDeleted && <span className="bg-red-500/60 font-medium to-white px-2.5 py-1 text-xs rounded">
        DELETED </span>}
      </div>
      {!emp.isDeleted && (
        <div className="absolute inset-0 bg-linear-to-t from-indigo-700/20 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3"> 
        <button className="p-2.5 bg-white/90 backdrop-blur-sm to-slate-700 hover:to-indigo-500 rounded-xl shadow-xl transition-all hover:scale-105" onClick={()=>onEdit(emp)}>
          <PencilIcon className="w-4 h-4"/>
        </button>
        <button onClick={handleDelete} className="p-2.5 bg-white/90 backdrop-blur-sm to-slate-700 hover:to-rose-500 rounded-xl shadow-xl transition-all hover:scale-105" >
          <Trash2Icon className="w-4 h-4"/>
        </button>

      </div>)}


      <div className="p-3">
      <p className="font-semibold text-slate-800">{emp.firstName} {emp.lastName}</p>
      <p className="text-sm text-slate-500">{emp.position}</p> 
      </div>
     
    </div>
  )
}

export default EmployeeCard
