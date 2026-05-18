import { useCallback, useEffect, useState } from "react"

import PayslipList from "../componenets/payslip/PayslipList"
import api from "../api/api"
import { toast } from "react-toastify"


const Payslips = () => {
  const [employees, setEmployees] = useState([]); // FIX: Renamed to plural for semantic clarity
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  const fetchPayslips = useCallback(async () => {
    try {
      const res = await api.get('/api/payslips');
      setPayslips(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []); // FIX: Added empty dependency array to prevent infinite rendering loops

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) {
      api.get('/api/employee')
        .then((res) => {
          // Ensuring res.data is handled safely if it arrives as an array
          const data = Array.isArray(res.data) ? res.data : [];
          setEmployees(data.filter((e) => !e.isDeleted));
        })
        .catch((err) => {
          console.error("Error fetching employees:", err);
        });
    }
  }, [isAdmin]);
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2>Payslips</h2>
          <p> {isAdmin ? "Manage and Generate Employee Payslip" : " Your Payslip History"}</p>

        </div>
        {isAdmin && <p className="" > Generate Forms</p>}

      </div>
      <PayslipList payslips={payslips} isAdmin={isAdmin} />

    </div>
  )
}

export default Payslips
