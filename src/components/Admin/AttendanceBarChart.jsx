import { Spin } from 'antd';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetChartsQuery } from '../../features/dashboardOverView/dashboardApi';

const AttendanceBarChart = () => {
  const { data: attendance, isLoading } = useGetChartsQuery();
  const [activeBar, setActiveBar] = useState(null);

  // Transform API data to match the chart format
  const chartData = attendance?.data?.dailySummary?.map(item => ({
    name: item.day,
    value: item.percentage,
    presentCount: item.presentCount,
    changeFromYesterday: item.changeFromYesterday
  })) || [];

  if (isLoading) {
    return (
      <div className="bg-white border border-[#336C79] rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-0">
          <h2 className="text-base sm:text-lg font-medium text-gray-800">Attendance Chart</h2>
          <button className="px-3 py-1 text-xs sm:text-sm rounded-lg border cursor-default border-gray-300 text-gray-600 hover:bg-gray-50 self-start sm:self-auto">
            Last 7 Days
          </button>
        </div>
        <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 flex items-center justify-center">
          <p><Spin size='small' /></p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#336C79] rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-0">
        <h2 className="text-base sm:text-lg font-medium text-gray-800">Attendance Chart</h2>
        <button className="px-3 py-1 text-xs sm:text-sm rounded-lg border cursor-default border-gray-300 text-gray-600 hover:bg-gray-50 self-start sm:self-auto">
          Last 7 Days
        </button>
      </div>

      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fontSize: window.innerWidth < 640 ? 10 : 12, 
                fill: '#9CA3AF' 
              }}
              dy={10}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fontSize: window.innerWidth < 640 ? 10 : 12, 
                fill: '#9CA3AF' 
              }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              width={window.innerWidth < 640 ? 35 : 45}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const dataItem = payload[0].payload;
                  return (
                    <div className="bg-white shadow-md rounded-md p-2 sm:p-3 border border-gray-200 text-xs sm:text-sm max-w-xs">
                      <p className="font-medium text-gray-800">{label}</p>
                      <p className="text-gray-600">
                        Attendance: <span className="font-medium text-[#336C79]">{payload[0].value}%</span>
                      </p>
                      <p className="text-gray-600">
                        Present: <span className="font-medium">{dataItem.presentCount}</span>
                      </p>
                      {dataItem.changeFromYesterday !== null && (
                        <p className="text-gray-600">
                          Change: <span className={`font-medium ${dataItem.changeFromYesterday >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {dataItem.changeFromYesterday >= 0 ? '+' : ''}{dataItem.changeFromYesterday}%
                          </span>
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              fill="#336C79"
              activeBar={{ fill: '#438a96' }}
              radius={[2, 2, 0, 0]}
              barSize={window.innerWidth < 640 ? 20 : window.innerWidth < 1024 ? 25 : 30}
              onMouseEnter={(data, index) => {
                setActiveBar(index);
              }}
              onMouseLeave={() => {
                setActiveBar(null);
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceBarChart;