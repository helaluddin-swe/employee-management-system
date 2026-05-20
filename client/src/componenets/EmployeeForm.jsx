import { useState } from "react"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import { DEPARTMENTS } from "../assets/assets"
import { Loader2Icon, User, Briefcase, ShieldAlert, X, Check } from "lucide-react"
import api from "../api/api"

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  // FIXED: Inverted logic logic (!!initialData makes it true if data exists)
  const isEditMode = !!initialData

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const formData = new FormData(e.currentTarget);
  
  // Convert FormData to a standard object
  const data = Object.fromEntries(formData.entries());

  // Handle optional password logic for edit mode safely
  if (isEditMode && !data.password) {
    delete data.password;
  }

  try {
    const url = isEditMode ? `/api/employees/${initialData.id}` : "/api/employees";
    const method = isEditMode ? "put" : "post";
    
    // Pass the standard object payload instead of raw FormData
    await api[method](url, data);
    
    onSuccess ? onSuccess() : navigate("/employees");
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.error || error.message);
  } finally {
    setLoading(false); // Make sure loading states flip back off safely
  }
};

  // Common Tailwind Input Styles for clean code reuse
  const inputStyles = "w-full mt-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm shadow-sm"
  const labelStyles = "block text-xs font-semibold uppercase tracking-wider text-slate-500"

  return (
    <form className="space-y-8 max-w-4xl mx-auto p-1 animate-fade-in" onSubmit={handleSubmit}>
      
      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2.5">
          <User className="w-4 h-4 text-slate-500" />
          <h3 className="font-semibold text-slate-800 text-sm tracking-wide uppercase">Personal Information</h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelStyles}>First Name</label>
            <input type="text" name="firstName" required defaultValue={initialData?.firstName} className={inputStyles} placeholder="John" />
          </div>
          <div>
            <label className={labelStyles}>Last Name</label>
            {/* FIXED: name was firstName */}
            <input type="text" name="lastName" required defaultValue={initialData?.lastName} className={inputStyles} placeholder="Doe" />
          </div>
          <div>
            <label className={labelStyles}>Phone Number</label>
            <input type="tel" name="phone" required defaultValue={initialData?.phone} className={inputStyles} placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className={labelStyles}>Join Date</label>
            <input type="date" name="joinDate" required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""} className={inputStyles} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelStyles}>Bio (optional)</label>
            {/* FIXED: Removed required attribute from optional field */}
            <textarea name="bio" defaultValue={initialData?.bio} rows={3} className={`${inputStyles} resize-none`} placeholder="Brief description of the employee's background..." />
          </div>
        </div>
      </div>

      {/* SECTION 2: EMPLOYEE DETAILS */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2.5">
          <Briefcase className="w-4 h-4 text-slate-500" />
          <h3 className="font-semibold text-slate-800 text-sm tracking-wide uppercase">Employee Details</h3>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelStyles}>Department</label>
            <select name="department" defaultValue={initialData?.department || ""} className={inputStyles} required>
              <option value="" disabled>Select Department</option>
              {DEPARTMENTS?.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyles}>Position</label>
            <input type="text" name="position" required defaultValue={initialData?.position} className={inputStyles} placeholder="Software Engineer" />
          </div>
          <div>
            <label className={labelStyles}>Basic Salary ($)</label>
            <input type="number" name="basicSalary" required defaultValue={initialData?.basicSalary || 0} min="0" step="0.01" className={inputStyles} />
          </div>
          <div>
            <label className={labelStyles}>Allowances ($)</label>
            <input type="number" name="allowances" required defaultValue={initialData?.allowances || 0} min="0" step="0.01" className={inputStyles} />
          </div>
          <div>
            <label className={labelStyles}>Deductions ($)</label>
            <input type="number" name="deductions" required defaultValue={initialData?.deductions || 0} min="0" step="0.01" className={inputStyles} />
          </div>
          
          {isEditMode && (
            <div>
              <label className={labelStyles}>Status</label>
              {/* FIXED: Removed unneeded min/step values, fixed spelling of employmentStatus */}
              <select name="employmentStatus" defaultValue={initialData?.employmentStatus || "ACTIVE"} className={inputStyles}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: ACCOUNT SETUP */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-slate-500" />
          <h3 className="font-semibold text-slate-800 text-sm tracking-wide uppercase">Account Setup</h3>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={labelStyles}>Work Email</label>
            <input type="email" name="email" required defaultValue={initialData?.email} className={inputStyles} placeholder="username@company.com" />
          </div>

          <div className="sm:col-span-2">
            <label className={labelStyles}>
              {isEditMode ? "Change Password (Leave blank to keep current)" : "Temporary Password"}
            </label>
            <input 
              type="password" 
              name="password" 
              required={!isEditMode} 
              className={inputStyles} 
              placeholder="••••••••••••"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelStyles}>System Role</label>
            <select name="role" defaultValue={initialData?.user?.role || "EMPLOYEE"} className={inputStyles}>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
        <button 
          type="button" 
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm shadow-blue-500/10"
        >
          {loading ? (
            <Loader2Icon className="animate-spin w-4 h-4" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {isEditMode ? "Update Employee Details" : "Create Account"}
        </button>
      </div>

    </form>
  )
}

export default EmployeeForm