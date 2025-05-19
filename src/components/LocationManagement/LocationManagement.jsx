import { Button, message, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomFilterDropdown from '../CustomFilterDropdown';
import LocationManagementHead from './LocationManagementHead';
import LocationModal from './LocationModal';

const { Option } = Select;

function LocationManagement() {
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

  const LocationColumns = [
    "SL",
    "Location Name",
    "Latitude",
    "Longitude",
    "Wi-Fi SSID",
    "Wi-Fi IP-Address",
    "Radius",
    "Status",
    "Action"
  ];

  const HolidayData = [
    {
      id: 1,
      locationName: "Brookwood Baptist Health",
      latitude: "40.7128",
      longitude: "74.0060",
      wifiSSID: "Institution-WiFi",
      wifiIPAddress: "10.0.60.85",
      redius: "600 meters",
      status: "Active"
    },

     {
      id: 1,
      locationName: "Brookwood Baptist Health",
      latitude: "40.7128",
      longitude: "74.0060",
      wifiSSID: "Institution-WiFi",
      wifiIPAddress: "10.0.60.85",
      redius: "600 meters",
      status: "Active"
    },
  ];


  const statusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];




  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-end gap-3">
        <div className='w-2/12'>
          <CustomFilterDropdown options={statusOptions} />
        </div>
        <div className='w-2/12'>
          <CustomFilterDropdown />
        </div>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsNewHolidayModalVisible(true)}
        >
          Create New Location
        </Button>
      </div>

      <LocationManagementHead data={HolidayData} columns={LocationColumns} />

      <LocationModal
        mode="create"
        visible={isNewHolidayModalVisible}
        onCancel={() => setIsNewHolidayModalVisible(false)}
        onCreate={handleCreateHoliday}
      // institutions={institutions}
      />
    </div>
  );
}

export default LocationManagement;