import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";


const AuthContext=createContext(null)
export const AuthProvider=({children})=>{
 const [user,setUser]=useState(null)
 const [token,setToken]=useState(localStorage.getItem("token"))
 const [loading,setLoading]=useState(null)
 const refreshToken=async()=>{
    const storedToken=localStorage.getItem("token")
    if(!storedToken){
      setLoading(false)
      setToken(null)
      setUser(null)
      return
    }

    try {
      const {data}=await api.get('/auth/session')
      setUser(data.user)
      
    } catch (error) {
        toast.error({error:error.message})
        localStorage.removeItem("token")
        setLoading(false)
        setToken(null)
        setUser(null)
        
      
    }finally{
      setLoading(false)
    }

  
    
 }
 useEffect(()=>{
  refreshToken()
 },[])

 const login=async(email,password,role)=>{
  const {data}=api.post('/auth/login',{email,password,role})
    localStorage.setItem("token",data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
 }
 const logout=async()=>{
   localStorage.removeItem("token")
   setToken(null)
   setUser(null)
 }
  const contextValue={login,logout,token,user,refreshToken,loading }
  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth=()=>{
  const ctx=useContext(AuthContext)
  if(!ctx) throw new Error ("auth context within context")
    return ctx
}