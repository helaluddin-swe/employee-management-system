import { useState } from "react"
import Loading from "../Loading"
import { LogInIcon, LogOut } from "lucide-react"


const ChekInButton = ({todayRecord,onAction}) => {
  const [loading,setLoading]=useState(false)

  const handleAttendance=async()=>{
    setLoading(true)
    setTimeout(()=>{
     setLoading(false)
     onAction()
    },1000)
  }


  if(todayRecord?.checkOut){
    return (
     <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900"> Work Day Completed</h3>
      <p className="text-slate-500 text-sm mt-1"> Great Gob ! See You Tommoror</p>
     </div>
    )
  }

  const isCheckedIn= !!todayRecord?.isCheckedIn
  return (
    <div className="absolute bottom-4 right-4 flex flex-col z-1">
      <button onClick={handleAttendance} disabled={loading} className={` w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-2xl bg-linear-to-br text-white ${isCheckedIn ?"from-slate-700 to-slate-900":"from-indigo-600 to-indigo-700"}`}>{loading ? <Loading/>: isCheckedIn?<LogOut/>:<LogInIcon/>}
      <div className="relative flex flex-col items-center text-center">
        <h2 className="text-lg font-medium mb-1">{loading? "Processing":isCheckedIn?"clock Out" :"clock In" }</h2>
        <p>{isCheckedIn ?"click to end your shift":"start your work Day"}</p>
      </div>
      
      </button>
      
    </div>
  )
}

export default ChekInButton
