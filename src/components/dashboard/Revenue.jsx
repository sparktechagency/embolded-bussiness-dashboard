import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const RevenueChart = () => {
  const data = [
    { name: 'Jan', revenue: 10000 },
    { name: 'Feb', revenue: 15000 },
    { name: 'Mar', revenue: 13000 },
    { name: 'Apr', revenue: 18000 },
    { name: 'May', revenue: 25000 },
    { name: 'Jun', revenue: 38753, highlighted: true },
    { name: 'Jul', revenue: 30000 },
    { name: 'Aug', revenue: 25000 },
    { name: 'Sep', revenue: 22000 },
    { name: 'Oct', revenue: 20000, highlighted: true },
    { name: 'Nov', revenue: 22000 },
    { name: 'Dec', revenue: 25000 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 border rounded shadow-lg">
          <p className="label">{`${payload[0].payload.name}: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 'dataMax + 5000']}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#FF6B6B" 
            strokeWidth={3}
            dot={({ payload }) => (
              payload.highlighted ? (
                <ReferenceDot 
                  x={payload.name} 
                  y={payload.revenue} 
                  r={8} 
                  fill="#FF6B6B"
                  stroke="#FF6B6B"
                />
              ) : (
                <circle r={4} fill="#FF6B6B" />
              )
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;