import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const AttendanceBarChart = () => {
  const [data] = useState([
    { name: 'Mon', value: 60 },
    { name: 'Tue', value: 80 },
    { name: 'Wed', value: 40 },
    { name: 'Thu', value: 65 },
    { name: 'Fri', value: 60 },
    { name: 'Sat', value: 25 },
    { name: 'Sun', value: 60 },
  ]);
  
  const [activeBar, setActiveBar] = useState(null);

  return (
    <div className="bg-white border border-[#336C79] rounded-lg p-6 shadow-sm w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-medium text-gray-800">Attendance Chart</h2>
        <button className="px-3 py-1 text-sm rounded-lg border cursor-default border-gray-300 text-gray-600 hover:bg-gray-50">
          Last 7 Days
        </button>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80]}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white shadow-md rounded-md p-2 border border-gray-200">
                      <p className="font-medium text-gray-800">{label}</p>
                      <p className="text-sm text-gray-600">
                        Attendance: <span className="font-medium text-[#336C79]">{payload[0].value}%</span>
                      </p>
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
              barSize={30}
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