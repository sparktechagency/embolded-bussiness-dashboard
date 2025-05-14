import { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const AttendanceChart = () => {
  const [data] = useState([
    { name: 'Mon', value: 80, color: '#6366F1' }, // Indigo
    { name: 'Tue', value: 90, color: '#4ADE80' }, // Green
    { name: 'Wed', value: 60, color: '#FBBF24' }, // Amber
    { name: 'Thu', value: 40, color: '#22D3EE' }, // Cyan
    { name: 'Fri', value: 45, color: '#A78BFA' }, // Purple
    { name: 'Sat', value: 25, color: '#3B82F6' }, // Blue
    { name: 'Sun', value: 1, color: '#FB7185' },  // Rose (small slice)
  ]);

  const [activeIndex, setActiveIndex] = useState(null);

  // Calculate the total for the center text
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

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
    <div  className="bg-white border border-[#336C79]  rounded-lg p-6 shadow-sm w-full w-full">
      <h2 className="text-lg font-medium text-gray-800 mb-1">Attendance</h2>
      <div className="h-px w-12 bg-blue-500 mb-4"></div>

      <div className="h-64 w-full relative">
        <ResponsiveContainer  width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
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
              {data.map((entry, index) => (
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
                  return (
                    <div className="bg-white shadow-md rounded-md p-3 border border-gray-200">
                      <p className="font-semibold">{payload[0].name}</p>
                      <p className="text-sm">
                        Attendance: <span className="font-medium">{payload[0].value}</span>
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

        {/* Center text showing total */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold -mt-8 text-gray-800">{total}</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;