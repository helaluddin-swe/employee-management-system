import { Link, useNavigate } from "react-router-dom"
import LoginFormLeft from "./LoginFormLeft"
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../context/authContext"


const LoginForm = ({ role, title, subTitle }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password, role)
      navigate("/dashboard")


    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Login Failed")

    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginFormLeft />
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12 bg-white">
        <div className="max-w-md w-full animate-fade-in">

          <Link to="/login" className="text-sm mb-12  text-slate-400 inline-flex gap-3 items-center hover:text-slate-800 transition-colors">
            <ArrowLeftIcon size={16} />Back to Portals
          </Link>

          <div className="mb-6 ">
            <h2 className="text-2xl md:text-3xl font-medium mb-2 text-zinc-800  ">{title}</h2>
            <p className="text-sm md:text-base text-slate-500 ">{subTitle}</p>
          </div>
          {error && (<div className="text-rose-400 text-sm ">  </div>)}

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2 ">
              <label className=" block mb-2 text-slace-400 font-medium text-sm ">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:ring-2 focus:ring-rose-400  border-gray-300 border w-full px-3 rounded-md py-3 " placeholder="john@gmail.com" required />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-slace-400 block mb-2 font-medium text-sm ">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="focus:ring-2 border-gray-300 border focus:ring-rose-400 pr-12 w-full rounded-md px-3 py-3 " placeholder="......" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2  text-center -translate-3.5 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full transition-all duration-300 bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2 items-center font-medium text-md rounded-md cursor-pointer" >
              {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin bg-blue-500" />}
              Sign In
            </button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default LoginForm
