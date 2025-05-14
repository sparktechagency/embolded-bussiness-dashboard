import React, { useState } from 'react';
import { Card, Avatar, Select, Badge, Row, Col, Calendar, Typography, Button } from 'antd';
// import { ArrowDownOutlined, ArrowUpOutlined } from 'lucide-react';

const { Title, Text } = Typography;
const { Option } = Select;

const EmployeeInformation = () => {
  const [selectedMonth, setSelectedMonth] = useState('February 2025');
  
  const employeeData = {
    id: '123456',
    name: 'Sabbir Ahmed',
    institution: 'Brookwood Baptist Health',
    department: 'Clinical',
    email: 'john.doe@example.com',
    phone: '+123 456 7890',
    weekend: 'Wednesday',
    schedule: '9:00 AM - 5:00 PM'
  };
  
  const attendanceData = {
    present: '5days',
    absent: '1day',
    leave: '10 Days',
    late: '2Days',
    holiday: '1 Day'
  };



  const [entries] = useState([
    {
      date: "April 20, 2025",
      checkIn: "08:56 AM",
      checkOut: "06:45 PM",
      duration: "9 hr 54 min"
    },
    {
      date: "April 20, 2025",
      checkIn: "08:56 AM",
      checkOut: "06:45 PM",
      duration: "9 hr 54 min"
    },
    {
      date: "April 20, 2025",
      checkIn: "08:56 AM",
      checkOut: "06:45 PM",
      duration: "9 hr 54 min"
    },
    // Add more entries if needed to demonstrate scrolling
    {
      date: "April 19, 2025",
      checkIn: "08:56 AM",
      checkOut: "06:45 PM",
      duration: "9 hr 54 min"
    },
    {
      date: "April 18, 2025",
      checkIn: "08:56 AM",
      checkOut: "06:45 PM",
      duration: "9 hr 54 min"
    }
  ]);
  
  const cellRender = (date) => {
    const day = date.date();
    let content = null;
    
    if (day === 1 || day === 2) {
      content = <Badge color="green" text="Present" />;
    } else if (day === 3) {
      content = <Badge color="blue" text="Holiday" />;
    } else if (day === 4) {
      content = <Badge color="red" text="Absent" />;
    } else if (day === 5) {
      content = <Badge text="Off-day" />;
    } else if (day === 6) {
      content = <Badge text="Off-day" />;
    }
    
    return content;
  };
  
  const checkInData = [
    { date: 'April 20, 2025', checkIn: '08:56 AM', checkOut: '06:45 PM', duration: '9 hr 54 min' },
    { date: 'April 20, 2025', checkIn: '08:56 AM', checkOut: '06:45 PM', duration: '9 hr 54 min' },
    { date: 'April 20, 2025', checkIn: '08:56 AM', checkOut: '06:45 PM', duration: '9 hr 54 min' }
  ];

  return (
    
      <div className="container h-5/6 mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <div className="flex items-center">
            <div onClick={() => window.history.back()} className="bg-white p-1 w-10 h-10  rounded-md cursor-pointer">
              <img src="/icons/PageBack.png" alt="page back" />
            </div>
            <Text className="text-blue-800 font-medium text-lg">Employee Information</Text>
          </div>
        </div>
        
        {/* Employee Info and Stats */}
        <div className="flex items-center  gap-4 mb-4">
          {/* Employee Profile */}
          <div className="w-4/12">
            <div className="flex items-start mb-4">
              <Avatar src="https://api.dicebear.com/6.x/initials/svg?seed=SA" size={64} className="mr-4" />
              <div className='border border-primary rounded-xl p-4'>
                <div className="mb-1"><span className="font-bold">Employee ID:</span> {employeeData.id}</div>
                <div className="mb-1"><span className="font-bold">Name:</span> {employeeData.name}</div>
                <div className="mb-1"><span className="font-bold">Institution: </span>{employeeData.institution}</div>
                <div className="mb-1"><span className="font-bold">Department:</span> {employeeData.department}</div>
                <div className="mb-1"><span className="font-bold">Email:</span> {employeeData.email}</div>
                <div className="mb-1"><span className="font-bold">Phone:</span> {employeeData.phone}</div>
                <div className="mb-1"><span className="font-bold">Weekend:</span> {employeeData.weekend}</div>
                <div className="mb-1"><span className="font-bold">Shift Schedule:</span> {employeeData.schedule}</div>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-4 w-8/12'>
            <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
              <h3 className='text-sm font-bold '>Present</h3>
              <h3 className='text-[30px] font-bold'>5days</h3>
            </div>
            <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
              <h3 className='text-sm font-bold '>Absent</h3>
              <h3 className='text-[30px] font-bold'>1days</h3>
            </div>
            <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
              <h3 className='text-sm font-bold '>Leave</h3>
              <h3 className='text-[30px] font-bold'>10days</h3>
            </div>
            <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
              <h3 className='text-sm font-bold '>Late</h3>
              <h3 className='text-[30px] font-bold'>2days</h3>
            </div>

            <div className='border flex flex-col gap-2 w-full border-primary rounded-xl p-3'>
              <h3 className='text-sm font-bold '>Holiday</h3>
              <h3 className='text-[30px] font-bold'>1days</h3>
            </div>
          </div>
        </div>
        
        {/* Calendar and Check-in Section */}
        <div className="flex items-start -mt-10 gap-4">
          {/* Calendar */}
          <div className="w-full ">
            <div className="shadow-sm">
              <div className="flex justify-end mb-4">
                <Select 
                  value={selectedMonth} 
                  onChange={(value) => setSelectedMonth(value)}
                  style={{ width: '100%', maxWidth: '200px' }}
                >
                  <Option value="January 2025">January 2025</Option>
                  <Option value="February 2025">February 2025</Option>
                  <Option value="March 2025">March 2025</Option>
                </Select>
              </div>
              
              <div className="custom-calendar border p-3 border-primary rounded-lg">
                <div className="grid grid-cols-7 gap-1">
                  {/* Days Header */}
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="bg-[#336C79] text-white p-2 text-center rounded">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Grid */}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    if (day > 30) return null;
                    
                    let statusElement = <div className="text-center"><span className="inline-block rounded-full bg-gray-300 w-2 h-2 mr-1"></span>N/A</div>;
                    
                    if (day === 1 || day === 2) {
                      statusElement = <div className="text-center"><span className="inline-block rounded-full bg-green-500 w-2 h-2 mr-1"></span>Present</div>;
                    } else if (day === 3) {
                      statusElement = <div className="text-center"><span className="inline-block rounded-full bg-blue-500 w-2 h-2 mr-1"></span>Holiday</div>;
                    } else if (day === 4) {
                      statusElement = <div className="text-center"><span className="inline-block rounded-full bg-red-500 w-2 h-2 mr-1"></span>Absent</div>;
                    } else if (day === 5 || day === 6) {
                      statusElement = <div className="text-center"><span className="inline-block rounded-full bg-gray-500 w-2 h-2 mr-1"></span>Off-day</div>;
                    }
                    
                    return (
                      <div key={day} className="border rounded p-2 min-h-14">
                        <div className="text-center mb-1">{day}</div>
                        {statusElement}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Check-in Records */}
        
      <div className="w-full max-w-md border rounded-lg overflow-hidden shadow-sm">
        {/* Scrollable container with custom scrollbar */}
        <div className="h-[490px] overflow-y-auto scrollbar-container">
          <div className="p-4 space-y-4">
            {entries.map((entry, index) => (
              <div 
                key={index} 
                className="border border-teal-600/30 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">{entry.date}</h2>
                  <span className="bg-[#336C79] text-white px-3 py-1 rounded-md text-sm">
                    {entry.duration}
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
            ))}
          </div>
          
          {/* Custom scrollbar */}
          <div className="absolute right-0 top-0 w-2 h-full">
            <div className="absolute right-0 top-0 w-2 h-full bg-gray-200 rounded-full"></div>
            <div className="absolute right-0 top-0 w-2 h-24 bg-[#336C79] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
          </div>
        
    
  );
};

export default EmployeeInformation;


const style = document.createElement('style');
style.textContent = `
  .scrollbar-container::-webkit-scrollbar {
    width: 8px;
  }
  
  .scrollbar-container::-webkit-scrollbar-track {
    background: #e5e7eb;
    border-radius: 9999px;
  }
  
  .scrollbar-container::-webkit-scrollbar-thumb {
    background: #0d9488;
    border-radius: 9999px;
  }
  
  .scrollbar-container {
    scrollbar-width: thin;
    scrollbar-color: #0d9488 #e5e7eb;
  }
`;
document.head.appendChild(style);