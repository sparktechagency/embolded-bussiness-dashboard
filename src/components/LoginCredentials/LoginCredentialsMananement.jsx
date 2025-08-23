import { Button, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomFilterDropdown from '../CustomFilterDropdown';
import LoginCredentialTableHead from './LoginCredentialTableHead';

const { Option } = Select;

function LoginCredentialsMananement() {
  const router = useNavigate();
  const holidayTypes = [
    { label: "DEPARTMENT MANAGER", value: "DEPARTMENT_MANAGER" },
    { label: "HR", value: "HR" },
    { label: "BUSINESS OWNER", value: "BUSINESS_OWNER" },
  ];

  const [selectedHolidayType, setSelectedHolidayType] = useState(null);

  const handleHolidayTypeChange = (selectedOption) => {
    setSelectedHolidayType(selectedOption);
    // You can perform any additional actions here with the selected value
  };


  const loginColumns = [
    "SL",
    "User Name",
    "Email",
    "Role",
    "Created at",
    "Status",
    "Action"
  ];


  return (
    <div className="sm:p-6 p-1 bg-gray-50 sm:w-full w-screen">
      <div className="mb-6 sm:flex justify-end gap-3">
        <div className='sm:w-[300px] w-full mb-2 sm:mb-0'>
          <CustomFilterDropdown
            options={holidayTypes}
            placeholder="Select holiday type"
            showAllOption={true}
            allOptionLabel="All Role"
            allOptionValue="all"
            onChange={handleHolidayTypeChange}
            labelKey="label"
            valueKey="value"
            width="100%"
            value={selectedHolidayType}
          />
        </div>
        <Button
          onClick={() => router("/login-credentials/new-role")}
          type="primary"
          className="bg-[#336C79] w-full sm:w-auto"
        >
          Add New Role
        </Button>
      </div>
      <div className='sm:overflow-hidden overflow-x-auto'>
        <LoginCredentialTableHead filterValue={selectedHolidayType} columns={loginColumns} />
      </div>
    </div>
  );
}

export default LoginCredentialsMananement;