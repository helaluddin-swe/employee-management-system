import { format } from 'date-fns';
import { Download } from "lucide-react";

// Helper Function
const formatPayslipMonth = (year, month) => {
  if (!year || !month) return 'N/A';
  return format(new Date(year, month - 1), "MMMM yyyy");
};

const PayslipList = ({ payslips, isAdmin }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800">Payslip Records</h2>
        <p className="text-sm text-slate-500 mt-1">
          {payslips.length} {payslips.length === 1 ? 'Payslip' : 'Payslips'} found
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              {isAdmin && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Employee
                </th>
              )}
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Period
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Basic Salary
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Net Salary
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {payslips.length === 0 ? (
              <tr>
                <td 
                  colSpan={isAdmin ? 5 : 4} 
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      📄
                    </div>
                    <p className="text-slate-500 text-lg font-medium">No Payslip Found</p>
                    <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              payslips.map((payslip, index) => (
                <tr 
                  key={payslip._id || payslip.id}
                  className="group hover:bg-slate-50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">
                        {payslip.employee?.firstName} {payslip.employee?.lastName}
                      </div>
                    </td>
                  )}

                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {formatPayslipMonth(payslip.year, payslip.month)}
                  </td>

                  <td className="px-6 py-4 text-right text-slate-600">
                    ${payslip.basicSalary?.toLocaleString() || '0'}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-emerald-600">
                    ${payslip.netSalary?.toLocaleString() || '0'}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => window.open(`/print/payslips/${payslip._id}`)}
                      className="inline-flex items-center px-5 py-2.5 text-blue-400 bg-gray-50hover:text-blue-500 cursor-pointer
                                  text-sm font-medium rounded-xl transition-all 
                                 active:scale-95 shadow-sm hover:shadow"
                    >
                      <Download className="w-4 h-4 text-red-500 mr-2" />
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipList;