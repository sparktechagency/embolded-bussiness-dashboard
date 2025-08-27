import { Avatar, DatePicker, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAttendanceQuery } from '../../features/attendance/attendanceApi';
import { baseURL } from '../../utils/BaseURL';

const { Title, Text } = Typography;
const { MonthPicker } = DatePicker;

const EmployeeInformation = () => {
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const { data, isLoading, isFetching } = useGetAttendanceQuery(
    {
      id,
      month: selectedMonth.format('YYYY-MM')
    },
    { skip: !id }
  );

  console.log(data?.data?.data)

  // Handle month change
  const handleMonthChange = (date) => {
    setSelectedMonth(date || dayjs());
  };

  // Extract employee data from API response
  const employeeData = data?.data?.data[0]?.userID || {
    name: 'Loading...',
    employeeID: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...'
  };



  // Extract institution and department data
  const institutionData = data?.data?.data[0]?.institutionID || {
    institutionName: '-----'
  };

  const departmentData = data?.data?.data[0]?.departmentID || {
    departmentName: '-----'
  };

  // Extract shift data
  const shiftData = data?.data?.data[0]?.shiftID || {
    shiftName: 'Loading...',
    shiftStartTime: '',
    shiftEndTime: ''
  };

  // Format attendance summary from API
  const attendanceSummary = data?.data?.statusSummary || {
    PRESENT: 0,
    ABSENT: 0,
    LEAVE: 0,
    LATE: 0,
    HOLIDAY: 0,
    OFFDAY: 0
  };

  // Format shift schedule
  const formatTime = (dateString) => {
    if (!dateString) return 'Loading...';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const shiftSchedule = shiftData.shiftStartTime && shiftData.shiftEndTime
    ? `${formatTime(shiftData.shiftStartTime)} - ${formatTime(shiftData.shiftEndTime)}`
    : 'Loading...';

  // Format attendance entries for the check-in records section
  const attendanceEntries = data?.data?.data?.map(entry => {
    const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const checkInTime = entry.checkInTime
      ? new Date(entry.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '--:--';

    const checkOutTime = entry.checkOutTime
      ? new Date(entry.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '--:--';

    let duration = '0 hr 0 min';
    if (entry.checkInTime && entry.checkOutTime) {
      const diff = new Date(entry.checkOutTime) - new Date(entry.checkInTime);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      duration = `${hours} hr ${minutes} min`;
    }

    return {
      date,
      checkIn: checkInTime,
      checkOut: checkOutTime,
      duration,
      status: entry.status
    };
  }) || [];

  // Generate calendar days with status from API data
  const generateCalendarDays = () => {
    const daysInMonth = selectedMonth.daysInMonth();
    const calendarDays = [];

    // Create a map of dates to status from API data
    const statusMap = {};
    data?.data?.data?.forEach(entry => {
      const date = new Date(entry.createdAt);
      const day = date.getDate();
      statusMap[day] = entry.status;
    });

    // Get first day of month to determine offset
    const firstDayOfMonth = selectedMonth.startOf('month').day();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="border rounded p-2 min-h-14"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let status = statusMap[day] || 'N/A';
      let badgeColor = 'gray';
      let badgeText = status;

      switch (status) {
        case 'PRESENT':
          badgeColor = 'green';
          break;
        case 'ABSENT':
          badgeColor = 'red';
          break;
        case 'LEAVE':
          badgeColor = 'orange';
          break;
        case 'LATE':
          badgeColor = 'yellow';
          break;
        case 'HOLIDAY':
          badgeColor = 'blue';
          break;
        case 'OFFDAY':
          badgeColor = 'gray';
          break;
        default:
          badgeColor = 'gray';
          badgeText = 'N/A';
      }

      calendarDays.push(
        <div key={day} className="border rounded p-2 min-h-14">
          <div className="text-center mb-1">{day}</div>
          <div className="text-center">
            <span className={`inline-block rounded-full bg-${badgeColor}-500 w-2 h-2 mr-1`}></span>
            {badgeText}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="small" />
      </div>
    );
  }

  return (
    <div className="container h-5/6 mx-auto ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mt-3 mt-0 ">
        <div className="flex items-center">
          <div onClick={() => window.history.back()} className="bg-white p-1 w-10 h-10  rounded-md cursor-pointer">
            <img src="/icons/PageBack.png" alt="page back" />
          </div>
          <Text className="text-blue-800 font-medium text-lg">Employee Information</Text>
        </div>
      </div>

      {/* Employee Info and Stats */}
      {
        data?.data?.data.length === 0 ? <div className='h-[300px] flex place-items-center justify-center text-base font-medium'>No attendance data available yet. The first day’s shift or attendance record will appear here once added.</div> : <>
          <div className="flex items-center gap-4 mb-4">
            {/* Employee Profile */}
            <div className="w-4/12">
              <div className="flex items-start mb-4">
                <Avatar
                  src={
                    employeeData?.profileImage
                      ? `${baseURL}${employeeData.profileImage}`
                      : `https://api.dicebear.com/6.x/initials/svg?seed=${employeeData?.name}`
                  }
                  size={64}
                  className="mr-4"
                />

                <div className='border border-primary rounded-xl p-4'>
                  <div className="mb-1"><span className="font-bold">Employee ID:</span> {employeeData.employeeID || 'N/A'}</div>
                  <div className="mb-1"><span className="font-bold">Name:</span> {employeeData.name}</div>
                  <div className="mb-1"><span className="font-bold">Institution: </span>{institutionData.institutionName}</div>
                  <div className="mb-1"><span className="font-bold">Department:</span> {departmentData.departmentName}</div>
                  <div className="mb-1"><span className="font-bold">Email:</span> {employeeData.email}</div>
                  <div className="mb-1"><span className="font-bold">Phone:</span> {employeeData.phone}</div>
                  <div className="mb-1"><span className="font-bold">Weekend:</span> Saturday, Sunday</div>
                  <div className="mb-1"><span className="font-bold">Shift Schedule:</span> {shiftSchedule}</div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4 w-8/12'>
              <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
                <h3 className='text-sm font-bold'>Present</h3>
                <h3 className='text-[30px] font-bold'>{attendanceSummary.PRESENT} days</h3>
              </div>
              <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
                <h3 className='text-sm font-bold'>Absent</h3>
                <h3 className='text-[30px] font-bold'>{attendanceSummary.ABSENT} days</h3>
              </div>
              <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
                <h3 className='text-sm font-bold'>Leave</h3>
                <h3 className='text-[30px] font-bold'>{attendanceSummary.LEAVE} days</h3>
              </div>
              <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
                <h3 className='text-sm font-bold'>Late</h3>
                <h3 className='text-[30px] font-bold'>{attendanceSummary.LATE} days</h3>
              </div>
              <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
                <h3 className='text-sm font-bold'>Holiday</h3>
                <h3 className='text-[30px] font-bold'>{attendanceSummary.HOLIDAY} days</h3>
              </div>
              <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
                <h3 className='text-sm font-bold'>Off Day</h3>
                <h3 className='text-[30px] font-bold'>{attendanceSummary.OFFDAY} days</h3>
              </div>
            </div>
          </div>

          {/* Calendar and Check-in Section */}
          <div className="flex items-start -mt-10 gap-4">
            {/* Calendar */}
            <div className="w-full">
              <div className="shadow-sm">
                <div className="flex justify-end mb-4">
                  <DatePicker
                    picker="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    style={{ width: '100%', maxWidth: '200px' }}
                    renderExtraFooter={() => (
                      <div className="text-center py-2 text-sm text-gray-500">
                        Select a month to filter attendance
                      </div>
                    )}
                  />
                </div>

                <div className="custom-calendar border p-3 border-primary rounded-lg">
                  <div className="grid grid-cols-7 gap-1">
                    {/* Days Header */}
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                      <div key={day} className="bg-[#336C79] text-white p-2 text-center rounded">
                        {day}
                      </div>
                    ))}

                    {/* Calendar Grid */}
                    {generateCalendarDays()}
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Records */}
            <div className="w-full max-w-md border rounded-lg overflow-hidden shadow-sm">
              <div className="h-[490px] overflow-y-auto scrollbar-container">
                {isFetching ? (
                  <div className="flex justify-center items-center h-full">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {attendanceEntries.length > 0 ? (
                      attendanceEntries.map((entry, index) => (
                        <div key={index} className="border border-teal-600/30 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">{entry.date}</h2>
                            <span className={`px-3 py-1 rounded-md text-sm ${entry.status === 'PRESENT' ? 'bg-green-500' :
                              entry.status === 'ABSENT' ? 'bg-red-500' :
                                entry.status === 'LEAVE' ? 'bg-orange-500' :
                                  entry.status === 'LATE' ? 'bg-yellow-500' :
                                    entry.status === 'HOLIDAY' ? 'bg-blue-500' :
                                      'bg-gray-500'
                              } text-white`}>
                              {entry.status}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            {/* Check In Card */}
                            <div className="w-[45%] border border-gray-300 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-800 font-semibold">Check In</span>
                                <span className="text-gray-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              </div>
                              <p className="text-gray-800 font-semibold mt-2">{entry.checkIn}</p>
                            </div>

                            {/* Check Out Card */}
                            <div className="w-[45%] border border-gray-300 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-800 font-semibold">Check Out</span>
                                <span className="text-gray-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              </div>
                              <p className="text-gray-800 font-semibold mt-2">{entry.checkOut}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p>No attendance records found for {selectedMonth.format('MMMM YYYY')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default EmployeeInformation;