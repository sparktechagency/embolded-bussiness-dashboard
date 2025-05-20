import { Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomFilterDropdown from '../CustomFilterDropdown';
import LoginCredentialTableHead from './LoginCredentialTableHead';

const { Option } = Select;

function LoginCredentialsMananement() {
  const router = useNavigate();


  // State for modals

  const loginColumns = [
    "SL",
    "User Name",
    "Email",
    "Password",
    "Role",
    "Created at",
    "Status",
    "Action"
  ];

  const loginData = [
    {
      id: 1,
      userName: "Brookwood Baptist Health",
      email: "rpsabbir.ahmed@gmail.com",
      password: "123456789",
      role: "Brookwood Baptist Health",
      createdAt: "April 25, 2025",
      status: "Active"
    },
    {
      id: 2,
      userName: "Brookwood Baptist Health",
      email: "rpsabbir.ahmed@gmail.com",
      password: "123456789",
      role: "Brookwood Baptist Health",
      assignRole: "HR/Employee Management",
      createdAt: "April 25, 2025",
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
          onClick={() => router("/login-credentials/new-role")}
          type="primary"
          className="bg-[#336C79]"
        >
          Add New Role
        </Button>
      </div>

      <LoginCredentialTableHead data={loginData} columns={loginColumns} />
    </div>
  );
}

export default LoginCredentialsMananement;