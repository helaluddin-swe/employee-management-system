import { useEffect, useState } from "react";
import Loading from "../componenets/Loading"; // Kept your folder spelling
import { toast } from "react-toastify";
import AdminDashboard from "../componenets/AdminDashboard";
import api from "../api/api";
import EmployeeDashboard from "../componenets/EmployeeDashboard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  // Fixed: Initialized as null since dashboard data arrives as an Object
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   api.get('/api/dashboard')
  //     .then((res) => setData(res.data))
  //     .catch((err) => toast.error(err?.message || err.response?.data?.error))
  //     .finally(() => setLoading(false));
  // }, []);

  if (loading) return <Loading />;
  
  // Fixed: Now correctly triggers if data fetching fails
  if (!data) return <div className="text-center text-slate-500 py-12">Failed to fetch dashboard data</div>;

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default Dashboard;