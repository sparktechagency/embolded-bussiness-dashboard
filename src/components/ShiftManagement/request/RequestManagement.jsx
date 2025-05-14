import { Select } from 'antd';
import RequestTableHead from './RequestTableHead';

const { Option } = Select;

function RequestManagement() {

  const holidayColumns = [
    "Date",
    "Employee Name",
    "Department",
    "Request Type",
    "Vacation Date",
    "Days",
    "Current Shift",
    "Apply Shift",
    "Status",
    "Action"
  ];



  const HolidayData = [
    {
      id: 1,
      date: "April 25, 2025",
      employeeName: "Dr. John Doe",
      department: "Clinical",
      requestType: "Vacation",
      vacationDate: {
        startDate:"April 26, 2025",
        endDate:"April 27, 2025",
      },
      days:2,
      currentShift:{
        startTime:"9:00 AM",
        endTime:"5:00 PM",
      },
      applyShift: {
        startTime:"9:00 AM",
        endTime:"5:00 PM",
      },

      status: "Waiting"
    },

    {
      id: 1,
      date: "April 25, 2025",
      employeeName: "Dr. John Doe",
      department: "Clinical",
      requestType: "Vacation",
      vacationDate: {
        startDate:"April 26, 2025",
        endDate:"April 27, 2025",
      },
      days:2,
      currentShift:{
        startTime:"9:00 AM",
        endTime:"5:00 PM",
      },
      applyShift: {
        startTime:"9:00 AM",
        endTime:"5:00 PM",
      },

      status: "Waiting"
    },
    
  ];


 
  return (
    <div className="flex flex-col gap-7">
      <div onClick={() => window.history.back()} className='w-8 h-8 cursor-pointer'>
        <img src="/icons/PageBack.png" alt="" />
      </div>
      <RequestTableHead data={HolidayData} columns={holidayColumns} />
    </div>
  );
}

export default RequestManagement;