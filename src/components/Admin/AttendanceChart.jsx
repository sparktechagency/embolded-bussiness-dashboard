import { Spin } from 'antd';
import { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useGetAttendanceQuery } from '../../features/dashboardOverView/dashboardApi';

const AttendanceChart = () => {
  const { data: attendance, isLoading } = useGetAttendanceQuery();

  // Map API data to chart format
  const chartData = attendance?.data?.dailySummary?.map(day => ({
    name: day.day,
    value: day.percentage,
    presentCount: day.presentCount,
    color: getColorForDay(day.day)
  })) || [];

  const [activeIndex, setActiveIndex] = useState(null);

  // Calculate the total for the center text
  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  // Function to assign colors based on day
  function getColorForDay(day) {
    const colors = {
      'Mon': '#6366F1', // Indigo
      'Tue': '#4ADE80', // Green
      'Wed': '#FBBF24', // Amber
      'Thu': '#22D3EE', // Cyan
      'Fri': '#A78BFA', // Purple
      'Sat': '#3B82F6', // Blue
      'Sun': '#FB7185'  // Rose
    };
    return colors[day] || '#999999'; // Default color if day not found
  }

  const renderCustomizedLegend = (props) => {
    const { payload } = props;

    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm text-gray-600">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white border border-[#336C79]  rounded-lg p-6 shadow-sm w-full">
      <h2 className="text-lg font-medium text-gray-800 mb-1">Attendance</h2>
      <div className="h-px w-12 bg-blue-500 mb-4"></div>

      <div className="h-64 w-full relative">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Spin size='small' />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={1}
                dataKey="value"
                onMouseEnter={(_, index) => {
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    stroke={activeIndex === index ? '#fff' : 'none'}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataItem = payload[0].payload;
                    return (
                      <div className="bg-white shadow-md rounded-md p-3 border border-gray-200">
                        <p className="font-semibold">{dataItem.name}</p>
                        <p className="text-sm">
                          Percentage: <span className="font-medium">{dataItem.value}%</span>
                        </p>
                        <p className="text-sm">
                          Present Count: <span className="font-medium">{dataItem.presentCount}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend content={renderCustomizedLegend} />
            </PieChart>
          </ResponsiveContainer>
        )}

        {/* Center text showing total */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold -mt-8 text-gray-800">
            {attendance?.data?.totalPresentCount}
          </div>
          <div className="text-xs text-gray-500 mt-1">Total Present</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;