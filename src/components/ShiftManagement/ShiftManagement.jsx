import { Button, message, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignShiftModal from './AssignEmployeeModal';
import NewShiftModal from './NewShiftModal';
import ShiftRequestModal from './ShiftRequestModal';
import ShiftTableHead from './ShiftTableHead';

const { Option } = Select;

function ShiftManagement() {
  const router = useNavigate();

  const [Shifts, setShifts] = useState([
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
  const [isNewShiftModalVisible, setIsNewShiftModalVisible] = useState(false);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [isAssignShiftModalVisible, setIsAssignShiftModalVisible] = useState(false);

  // Handle department creation
  const handleCreateHoliday = (values) => {
    const newDepartment = {
      key: (Shifts.length + 1).toString(),
      id: Shifts.length + 1,
      institution: values.institution,
      name: values.name,
      totalEmployee: values.totalEmployee,
      status: 'Active'
    };

    setShifts([...Shifts, newDepartment]);
    setIsNewShiftModalVisible(false);
    message.success('Department created successfully');
  };

  const holidayColumns = [
    "SL",
    "Shift Name",
    "Shift Start Time",
    "Shift End Time",
    "Total User",
    "Status",
    "Action"
  ];

  const HolidayData = [
    {
      id: 1,
      shiftName: "Government Holiday",
      shiftStartTime: "09:00 AM",
      shiftEndTime: "05:00 AM",
      totalUser: 20,
      status: "Active"
    },
      {
      id: 2,
      shiftName: "Government Holiday",
      shiftStartTime: "09:00 AM",
      shiftEndTime: "05:00 AM",
      totalUser: 20,
      status: "Active"
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-end gap-3">
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsRequestModalVisible(true)}
        >
          Request (02)
        </Button>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsNewShiftModalVisible(true)}
        >
          Create New Shift
        </Button>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsAssignShiftModalVisible(true)}
        >
          Assign Employee Shift
        </Button>
      </div>

      <ShiftTableHead data={HolidayData} columns={holidayColumns} />

      <NewShiftModal
        mode="create"
        visible={isNewShiftModalVisible}
        onCancel={() => setIsNewShiftModalVisible(false)}
        onCreate={handleCreateHoliday}
      />

      <ShiftRequestModal
        visible={isRequestModalVisible}
        onCancel={() => setIsRequestModalVisible(false)}
      />

      <AssignShiftModal
        visible={isAssignShiftModalVisible}
        onCancel={() => setIsAssignShiftModalVisible(false)}
      />

    </div>
  );
}

export default ShiftManagement;