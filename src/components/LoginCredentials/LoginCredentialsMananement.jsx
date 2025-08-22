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
    <div className="p-6 bg-gray-50">
      <div className="mb-6 flex justify-end gap-3">
        <div className='w-[300px]'>
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
          className="bg-[#336C79]"
        >
          Add New Role
        </Button>
      </div>
      <LoginCredentialTableHead filterValue={selectedHolidayType} columns={loginColumns} />
    </div>
  );
}

export default LoginCredentialsMananement;