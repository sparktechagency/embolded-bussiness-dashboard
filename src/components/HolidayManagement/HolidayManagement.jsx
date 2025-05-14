import { Button, message, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HolidayTableHead from './HolidayTableHead';
import HolidayModal from './HolidayModal';
import CustomFilterDropdown from '../CustomFilterDropdown';

const { Option } = Select;

function HolidayManagement() {
  const router = useNavigate();

  const [holidays, setHolidays] = useState([
    {
      key: '1',
      id: 1,
      institution: 'Brookwood Baptist Health',
      name: 'Spark tech',
      totalEmployee: 200,
      status: 'Active'
    },
    // Duplicate entries for demo purposes
    ...Array.from({ length: 8 }, (_, i) => ({
      key: (i + 2).toString(),
      id: i + 2,
      institution: 'Brookwood Baptist Health',
      name: 'Spark tech',
      totalEmployee: 200,
      status: 'Active'
    }))
  ]);

  // State for modals
  const [isNewHolidayModalVisible, setIsNewHolidayModalVisible] = useState(false);

  // Handle department creation
  const handleCreateHoliday = (values) => {
    const newDepartment = {
      key: (holidays.length + 1).toString(),
      id: holidays.length + 1,
      institution: values.institution,
      name: values.name,
      totalEmployee: values.totalEmployee,
      status: 'Active'
    };

    setHolidays([...holidays, newDepartment]);
    setIsNewHolidayModalVisible(false);
    message.success('Department created successfully');
  };

  const holidayColumns = [
    "SL",
    "Holiday Type",
    "Name",
    "Start Date",
    "End Date",
    "Total Day",
    "Status",
    "Action"
  ];

  const HolidayData = [
    {
      id: 1,
      HolidayType: "Government Holiday",
      Name: "New Year's Day",
      StartDate: "Jan 01, 2025",
      EndDate: "Jan 01, 2025",
      TotalDay: "1",
      status: "Active"
    },
    {
      id: 2,
      HolidayType: "Government Holiday",
      Name: "New Year's Day",
      StartDate: "Jan 01, 2025",
      EndDate: "Jan 01, 2025",
      TotalDay: "1",
      status: "Active"
    },

  ];



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-end gap-3">
       <div className='w-2/12'>
       <CustomFilterDropdown />
       </div>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsNewHolidayModalVisible(true)}
        >
          Create New Holiday
        </Button>
      </div>

      <HolidayTableHead data={HolidayData} columns={holidayColumns} />

      <HolidayModal
        mode="create"
        visible={isNewHolidayModalVisible}
        onCancel={() => setIsNewHolidayModalVisible(false)}
        onCreate={handleCreateHoliday}
      // institutions={institutions}
      />
    </div>
  );
}

export default HolidayManagement;