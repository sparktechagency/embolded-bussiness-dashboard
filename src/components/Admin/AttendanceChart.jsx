import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useGetChartsQuery } from '../../features/dashboardOverView/dashboardApi';

const AttendanceChart = () => {
  const { data: attendance, isLoading } = useGetChartsQuery();
  const [activeIndex, setActiveIndex] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');

  // Track screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('mobile');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('tablet');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('desktop');
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map API data to chart format
  const chartData = attendance?.data?.dailySummary?.map(day => ({
    name: day.day,
    value: day.percentage,
    presentCount: day.presentCount,
    color: getColorForDay(day.day)
  })) || [];

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

  // Responsive dimensions
  const getChartDimensions = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          innerRadius: 35,
          outerRadius: 55,
          chartHeight: 220,
          centerOffset: -25,
          centerFontSize: '16px',
          centerLabelFontSize: '10px'
        };
      case 'sm':
        return {
          innerRadius: 40,
          outerRadius: 65,
          chartHeight: 240,
          centerOffset: -30,
          centerFontSize: '18px',
          centerLabelFontSize: '11px'
        };
      case 'tablet':
        return {
          innerRadius: 50,
          outerRadius: 75,
          chartHeight: 260,
          centerOffset: -35,
          centerFontSize: '20px',
          centerLabelFontSize: '12px'
        };
      case 'lg':
        return {
          innerRadius: 55,
          outerRadius: 85,
          chartHeight: 280,
          centerOffset: -40,
          centerFontSize: '22px',
          centerLabelFontSize: '13px'
        };
      default:
        return {
          innerRadius: 60,
          outerRadius: 90,
          chartHeight: 311,
          centerOffset: -45,
          centerFontSize: '24px',
          centerLabelFontSize: '14px'
        };
    }
  };

  const renderCustomizedLegend = (props) => {
    const { payload } = props;
    const isMobile = screenSize === 'mobile' || screenSize === 'sm';

    return (
      <ul className={`flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3 mt-2 sm:mt-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <div className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full`} style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-600">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  const {
    innerRadius,
    outerRadius,
    chartHeight,
    centerOffset,
    centerFontSize,
    centerLabelFontSize
  } = getChartDimensions();

  return (
    <div className="bg-white border border-[#336C79] rounded-lg p-3 sm:p-4 md:p-6 shadow-sm w-full">
      <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 mb-1">Attendance</h2>
      <div className="h-px w-6 sm:w-8 md:w-12 bg-blue-500 mb-2 sm:mb-3 md:mb-4"></div>

      <div className={`w-full relative`} style={{ height: `${chartHeight}px` }}>
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Spin size='small' />
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                margin={{
                  top: 10,
                  right: 5,
                  bottom: screenSize === 'mobile' || screenSize === 'sm' ? 30 : 50,
                  left: 5,
                }}
              >
                <Pie
                  data={chartData}
                  cx="50%"
                  cy={screenSize === 'mobile' || screenSize === 'sm' ? "50%" : "50%"}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
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
                        <div className="bg-white shadow-md rounded-md p-2 sm:p-3 border border-gray-200 text-xs sm:text-sm max-w-xs">
                          <p className="font-semibold">{dataItem.name}</p>
                          <p>
                            Percentage: <span className="font-medium">{dataItem.value}%</span>
                          </p>
                          <p>
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

            {/* Center text showing total */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ marginTop: `${centerOffset}px` }}
            >
              <div
                className="font-bold text-gray-800"
                style={{ fontSize: centerFontSize }}
              >
                {attendance?.data?.totalPresentCount}
              </div>
              <div
                className="text-gray-500 mt-1"
                style={{ fontSize: centerLabelFontSize }}
              >
                Total Present
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceChart;