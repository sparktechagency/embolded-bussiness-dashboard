import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import CustomFilterDropdown from '../../CustomFilterDropdown';
import AssignShiftModal from '../AssignEmployeeModal';
import AllUserTableHead from './AllUserTableHead';

const AllUserTable = () => {
  const [isAssignShiftModalVisible, setIsAssignShiftModalVisible] = useState(false);
  const employeeColumns = [
    "ID",
    "Employee Name",
    "Institution Name",
    "Department Type",
    "Check In",
    "Check Out",
    "Total Working Time",
    "Status",
  ];

  const employeeData = [
    {
      id: 1,
      employeName: "Dr. John Doe",
      institution: "Brookwood Baptist Health",
      department: "Clinical",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      totalWorkingTime: "8h 00min",
      status: "On Track",
    },
    {
      id: 2,
      employeName: "Dr. Jane Smith",
      institution: "Brookwood Baptist Health",
      department: "Clinical",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      totalWorkingTime: "8h 00min",
      status: "Absent",
    }
  ];

  // Current date for display
  // const currentDate = dayjs().format('MMMM D, YYYY');


  const departMentFilter = [
    { label: 'All', value: 'all' },
    { label: 'Clinical', value: 'Clinical' },
    { label: 'Spark Tech', value: 'SparkTech' },
    { label: 'Softvance', value: 'Softvance' },
  ]

  const InstituteFilter = [
    { label: 'All', value: 'all' },
    { label: 'Brookwood Baptist Health', value: 'Brookwood Bapist' },
    { label: 'USA Health', value: ' USA Health' },
    { label: ' University of Alabama Hospital ', value: 'University of Al' },
  ]

  return (
    <main className="p-4 mt-5">
      <section className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
        <div className="flex item-center gap-4 w-4/12">
          <h3 className='text-base'>
            <span className='font-semibold'>Shift Start Time:</span> 09:00 AM
          </h3>
          <h3 className='text-base'>
            <span className='font-semibold'>Shift End Time:</span> 05:00 PM
          </h3>
        </div>
        <div className='flex items-center gap-4 w-8/12 '>
          <DatePicker
            defaultValue={dayjs()}
            format="MMMM D, YYYY"
            className=''
            style={{ width: '100%', height: '40px' }}
          />
          <CustomFilterDropdown options={departMentFilter} />
          <CustomFilterDropdown options={InstituteFilter} />
          <Button
            type="primary"
            onClick={() => setIsAssignShiftModalVisible(true)}
            className='bg-primary text-white px-4 py-2 rounded-md w-full sm:w-auto'
          >
            Assign Shift
          </Button>
        </div>
      </section>

      <AllUserTableHead columns={employeeColumns} data={employeeData} />


      <AssignShiftModal
        visible={isAssignShiftModalVisible}
        onCancel={() => setIsAssignShiftModalVisible(false)}
      />
    </main>
  );
};

export default AllUserTable;