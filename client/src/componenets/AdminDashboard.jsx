import { Building2Icon, Calendar1Icon, FileTextIcon, UserIcon } from "lucide-react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UserIcon,
      value: data.totalEmployees,
      title: "Total Employees",
      description: "Active Workforce"
    },
    {
      icon: Building2Icon,
      value: data.totalDepartment,
      title: "Department",
      description: "Organization Units"
    },
    {
      icon: Calendar1Icon,
      value: data.todayAttendance,
      title: "Today Attendance",
      description: "Checked in today"
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      description: "Waiting Approval"
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back admin - here's your Overview
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {stats.map((stat) => (
          /* Fixed: Added 'group' class to wrapper for structural animations */
          <div key={stat.title} className="group relative card card-hover flex items-center justify-between overflow-hidden p-5">
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-500/70 group-hover:bg-indigo-500/70 transition-colors" />
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              {/* Fixed: Replaced 'stat.descriptione' typo with the actual stat value */}
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.description}</p>
            </div>
            <stat.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;