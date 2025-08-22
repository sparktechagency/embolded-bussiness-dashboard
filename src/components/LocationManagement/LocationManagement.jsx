import { Button, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';
import { useCreateLocationMutation } from '../../features/location/locationApi';
import CustomFilterDropdown from '../CustomFilterDropdown';
import LocationManagementHead from './LocationManagementHead';
import LocationModal from './LocationModal';

function LocationManagement() {
  const router = useNavigate();

  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [status, setStatus] = useState(null);
  console.log(selectedInstitution)
  const [createLocation, { isLoading: creatingLoading }] = useCreateLocationMutation();
  const { data: institutionData, isLoading: instituteLoading } = useGetAllInstitutionsQuery();

  // State for modals
  const [isNewHolidayModalVisible, setIsNewHolidayModalVisible] = useState(false);

  const handleInstitutionChange = (value) => {
    setSelectedInstitution(value === 'all' ? null : value);
    setStatus(null);
  };

  const handleStatusChage = (value) => {
    setStatus(value === 'all' ? null : value)
    setSelectedInstitution(null)
  }

  // Handle location creation with API
  const handleCreateLocation = async (values) => {
    try {
      // Map form values to API payload format
      const locationPayload = {
        locationName: values.name,
        institutionID: values.institutionId,
        latitude: values.latitude,
        longitude: values.longitude,
        wifiSSID: values.ssid,
        wifiIPAddress: values.ipAddress,
        radius: parseInt(values.radius)
      };
      const response = await createLocation(locationPayload).unwrap();
      // Handle successful creation
      if (response.success) {
        message.success(response.message || 'Location created successfully');
      } else {
        message.error('Failed to create location');
      }
      setIsNewHolidayModalVisible(false);
    } catch (error) {
      console.error('Error creating location:', error);

      // Handle different types of errors
      if (error.data && error.data.message) {
        message.error(error.data.message);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error('An error occurred while creating the location');
      }
    }
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
      radius: "600 meters",
      status: "Active"
    },
    {
      id: 2,
      locationName: "Brookwood Baptist Health",
      latitude: "40.7128",
      longitude: "74.0060",
      wifiSSID: "Institution-WiFi",
      wifiIPAddress: "10.0.60.85",
      radius: "600 meters",
      status: "Active"
    },
  ];

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-w-full">
      <div className="mb-6 w-full flex justify-end gap-3">
        <div className='w-2/12'>
          <CustomFilterDropdown
            options={institutionData?.data.data}
            placeholder="Choose an institution"
            showAllOption={true}
            allOptionLabel="All Institutions"
            allOptionValue="all"
            onChange={handleInstitutionChange}
            labelKey="institutionName"
            valueKey="_id"
            width="100%"
            value={selectedInstitution}
          />
        </div>
        <div className='w-2/12'>
          <CustomFilterDropdown
            options={statusOptions}
            placeholder="Choose an institution"
            showAllOption={true}
            allOptionLabel="Select Status"
            allOptionValue="All"
            onChange={handleStatusChage}
            labelKey="institutionName"
            valueKey="_id"
            width="100%"
            value={selectedInstitution}
          />
        </div>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsNewHolidayModalVisible(true)}
          loading={creatingLoading}
          classNames={"text-sm sm:text-base md:text-base lg:text-base"}
        >
          Create New Location
        </Button>
      </div>

      {/* Fixed container for horizontal scrolling */}

      <div className="p-2 overflow-x-auto">
        <LocationManagementHead
          status={status}
          selectedInstitution={selectedInstitution}
          institutionFilter={selectedInstitution}
          data={HolidayData}
          columns={LocationColumns}
        />

      </div>

      <LocationModal
        mode="create"
        visible={isNewHolidayModalVisible}
        onCancel={() => setIsNewHolidayModalVisible(false)}
        onSubmit={handleCreateLocation}
        loading={creatingLoading}
      />
    </div>
  );
}

export default LocationManagement;