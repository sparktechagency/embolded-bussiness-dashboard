import { Button, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateHolidayMutation } from '../../features/holiday/holidayApi';
import CustomFilterDropdown from '../CustomFilterDropdown';
import HolidayModal from './HolidayModal';
import HolidayTableHead from './HolidayTableHead';

const { Option } = Select;

function HolidayManagement() {
  const router = useNavigate();
  const [createHoliday, { isLoading: isCreatingHoliday }] = useCreateHolidayMutation();
  const holidayTypes = [
    { label: "GOVERNMENT", value: "GOVERNMENT" },
    { label: "OFFICE", value: "OFFICE" }
  ];

  const [selectedHolidayType, setSelectedHolidayType] = useState(null);

  // Handle selection change
  const handleHolidayTypeChange = (selectedOption) => {
    setSelectedHolidayType(selectedOption);
    // You can perform any additional actions here with the selected value
  };

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

  // Handle holiday creation
  const handleCreateHoliday = async (values) => {
    try {
      const holidayData = {
        name: values.name,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
        holidayType: values.type,
        institutionID: values.instituteName
      };
      const response = await createHoliday(holidayData).unwrap();
      console.log(response)
    } catch (error) {
      console.error('Error creating holiday:', error);
      message.error(error?.data?.message || 'Failed to create holiday');
    }
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
    <div className="p-6 bg-gray-50">
      <div className="mb-6 flex justify-end gap-3">
        <div className='w-2/12'>
          <CustomFilterDropdown
            options={holidayTypes}
            placeholder="Select holiday type"
            showAllOption={true}
            allOptionLabel="All Types"
            allOptionValue="all"
            onChange={handleHolidayTypeChange}
            labelKey="label"
            valueKey="value"
            width="100%"
            value={selectedHolidayType}
          />
        </div>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsNewHolidayModalVisible(true)}
        >
          Create New Holiday
        </Button>
      </div>

      <HolidayTableHead filterValue = {selectedHolidayType} data={HolidayData} columns={holidayColumns} />

      <HolidayModal
        mode="create"
        visible={isNewHolidayModalVisible}
        onCancel={() => setIsNewHolidayModalVisible(false)}
        onSubmit={handleCreateHoliday}
        loading={isCreatingHoliday}
      />
    </div>
  );
}

export default HolidayManagement;