import { ArrowRightIcon, CalendarHeartIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom"; // Fixed: Imported from react-router-dom

const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;
  
  const cards = [
    {
      icon: CalendarHeartIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This Month"
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting Approval"
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip?.netSalary 
        ? `$${data.latestPayslip.netSalary.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most Recent Payout"
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Welcome {emp?.firstName}!</h1>
        <p className="page-subtitle">
          {emp?.position || emp?.department || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-6">
        {cards.map((card, index) => (
          /* Fixed: Added 'group' class to wrapper so group-hover targets work */
          <div key={index} className="group relative card card-hover flex items-center justify-between overflow-hidden p-5">
            <div> 
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-500/70 group-hover:bg-indigo-500/70 transition-colors" />
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              {/* Fixed: Displaying the actual statistical value here */}
              <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p> 
              <p className="text-xs text-slate-400 mt-0.5">{card.subtitle}</p>
            </div>
            <card.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Fixed: Corrected typo from gpa-2 to gap-2 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/attendance" className="btn-primary text-center inline-flex items-center justify-center gap-2">
          Mark Attendance <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <Link to="/leave" className="btn-secondary text-center inline-flex items-center justify-center gap-2">
          Apply for Leave <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;