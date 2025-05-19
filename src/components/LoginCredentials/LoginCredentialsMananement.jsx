import { Button, message, Select } from 'antd';
import CustomFilterDropdown from '../CustomFilterDropdown';
import LoginCredentialTableHead from './LoginCredentialTableHead';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function LoginCredentialsMananement() {
  const router = useNavigate();


  // State for modals

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






  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-end gap-3">
        <div className='w-2/12'>
          <CustomFilterDropdown />
        </div>
        <Button
        onClick={()=> router("/login-credentials/new-role")}
          type="primary"
          className="bg-[#336C79]"
        >
          Add New Role
        </Button>
      </div>

      <LoginCredentialTableHead data={HolidayData} columns={LocationColumns} />
    </div>
  );
}

export default LoginCredentialsMananement;