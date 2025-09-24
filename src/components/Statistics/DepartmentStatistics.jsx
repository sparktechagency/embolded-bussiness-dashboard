// src/components/Statistics/DepartmentStatistics.jsx
import { Spin } from 'antd';
import { useStatisticsForHrAndDepQuery } from '../../features/dashboardOverview/dashboardApi';

const DepartmentStatistics = () => {
  const { data, isLoading } = useStatisticsForHrAndDepQuery();

  return (
    <div className="border border-primary rounded-lg p-3 sm:p-4  bg-white shadow-sm">
      <div className="w-full rounded-xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Statistics</h2>
          <span className="border border-primary px-3 py-1.5 text-sm font-medium rounded-lg text-primary bg-primary/5 whitespace-nowrap select-none">
            Last 7 Days
          </span>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col gap-4">
          {/* Total Employees & Check In (Side by Side on Large Screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-primary rounded-xl p-4 bg-white">
              <h3 className="font-medium text-base sm:text-xl mb-2">Total Employee</h3>
              <div className="text-lg sm:text-xl font-bold text-gray-800">
                {isLoading ? <Spin size="small" /> : data?.totalEmployees ?? 0}
              </div>
            </div>

            <div className="border border-primary rounded-xl p-4 bg-white">
              <h3 className="font-medium text-base sm:text-xl mb-2">Total Check In</h3>
              <div className="text-lg sm:text-xl font-bold text-gray-800">
                {isLoading ? <Spin size="small" /> : data?.todayCheckIn ?? 0}
              </div>
            </div>
          </div>

          {/* Full Width Cards */}
          <div className="border border-primary rounded-xl p-4 bg-white">
            <h3 className="font-medium text-base sm:text-xl mb-2">Total Check Out</h3>
            <div className="text-lg sm:text-xl font-bold text-gray-800">
              {isLoading ? <Spin size="small" /> : data?.todayCheckOut ?? 0}
            </div>
          </div>

          <div className="border border-primary rounded-xl p-4 bg-white">
            <h3 className="font-medium text-base sm:text-xl mb-2">Total Absent</h3>
            <div className="text-lg sm:text-xl font-bold text-gray-800">
              {isLoading ? <Spin size="small" /> : data?.todayAbsent ?? 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentStatistics;