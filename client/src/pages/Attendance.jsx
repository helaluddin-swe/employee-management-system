import { useCallback, useEffect, useState } from "react"
import { dummyAttendanceData } from "../assets/assets"
import Loading from "../componenets/Loading"
import ChekInButton from "../componenets/attendance/ChekInButton"
import AttendanceStats from "../componenets/attendance/AttendanceStats"
import AttendanceHistory from "../componenets/attendance/AttendanceHistory"


const Attendance = () => {
  const [history,setHistory]=useState([])
  const [loading,setLoading]=useState(true)
  const [isDeleted,setIsDeleted]=useState(false)
  const fetchData=useCallback(async()=>{
    setHistory(dummyAttendanceData)
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[])
  useEffect(()=>{
  fetchData()
  },[fetchData])
  if(loading) return <Loading/>
 const today = new Date() 
today.setHours(0,0,0,0)
const todayRecord = history.find((r) => new Date(r.date).toDateString() === today.toDateString())
  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight"> Attendance</h1>
        <p className="text-sm text-slate-500 mt-1">Track your work hours and daily chekc in time</p>
      </div>

      {isDeleted ? (<div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-center"> 
        <p className="text-rose-600">You can no longer clock in or out because your employee records have been marked as deleted</p>
      </div>):(<div className="mb-8">  
          <ChekInButton onAction={fetchData} todayRecord={todayRecord}/>
         </div>)}
     <AttendanceStats history={history}/>
     <AttendanceHistory history={history}/>
    </div>
  )
}

export default Attendance
