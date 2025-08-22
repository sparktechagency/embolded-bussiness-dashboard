// src/pages/ParkingDashboard.jsx
import { useEffect } from 'react';
import AbsentTableHead from '../../components/Admin/AbsentTableHead';
import AttendanceBarChart from '../../components/Admin/AttendanceBarChart';
import AttendanceChart from '../../components/Admin/AttendanceChart';
import LateTableHead from '../../components/Admin/LateTableHead';
import AdminStatistics from '../../components/Statistics/AdminStatistics';
import DepartmentStatistics from '../../components/Statistics/DepartmentStatistics';

const ParkingDashboard = () => {
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) {
      window.location.href = "/auth/login";
    }
  }, [role]);

  const absentTableHeaders = [
    "SL",
    "Employee ID",
    "Employee Name",
    "Institution",
    "Department",
    "Shift Schedule",
    "Account Status",
  ];

  const lateTableHeaders = [
    "SL",
    "Employee ID",
    "Employee Name",
    "Institution",
    "Department",
    "Shift Schedule",
    "Late Min",
    "Account Status",
  ];

  return (
    <div className="mt-4 sm:mt-6 px-4 sm:px-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Attendance Chart */}
        <div className="sm:col-span-2 lg:col-span-1">
          <AttendanceChart />
        </div>

        {/* Bar Chart */}
        <div className="sm:col-span-2 lg:col-span-1">
          <AttendanceBarChart />
        </div>

        {/* Statistics */}
        <div className="sm:col-span-2 lg:col-span-1">
          {role === "BUSINESS_OWNER" ? <AdminStatistics /> : <DepartmentStatistics />}
        </div>

        {/* Today's Absent */}
        <div className="sm:col-span-2 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Today's Absent</h2>
            </div>
            <div className="p-2 overflow-x-auto">
              <AbsentTableHead columns={absentTableHeaders} />
            </div>
          </div>
        </div>

        {/* Today's Late */}
        <div className="sm:col-span-2 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Today's Late</h2>
            </div>
            <div className="p-2 overflow-x-auto">
              <LateTableHead columns={lateTableHeaders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingDashboard;