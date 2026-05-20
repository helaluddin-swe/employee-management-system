import { useCallback, useEffect, useState } from "react"
import PayslipList from "../componenets/payslip/PayslipList"
import api from "../api/api"
import { toast } from "react-toastify"

const Payslips = () => {
  const [employees, setEmployees] = useState([]); 
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true; // Recommend reading this dynamically from auth hooks

  const fetchPayslips = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/payslips');
      // Defensively fallback to res.data if res.data.data isn't setup
      const receivedPayslips = res.data?.data || res.data || [];
      setPayslips(Array.isArray(receivedPayslips) ? receivedPayslips : []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message || "Failed to load payslips");
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) {
      api.get('/api/employees')
        .then((res) => {
          // Explicit check handles direct array structural returns
          const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
          setEmployees(data.filter((e) => !e.isDeleted));
        })
        .catch((err) => {
          console.error("Error fetching employees:", err);
          toast.error("Could not populate employee baseline filter list.");
        });
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin h-9 w-9 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payslips</h1>
          <p className="text-sm text-slate-500 mt-1">
            {isAdmin ? "Manage and Generate Employee Payslips" : "Your Payslip History"}
          </p>
        </div>
        {isAdmin && (
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Generate Forms
          </button>
        )}
      </div>
      
      <PayslipList payslips={payslips} isAdmin={isAdmin} employees={employees} />
    </div>
  )
}

export default Payslips;