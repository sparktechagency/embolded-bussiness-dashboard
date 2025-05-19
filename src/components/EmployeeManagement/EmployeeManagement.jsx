import { Button, message, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomFilterDropdown from '../CustomFilterDropdown';
import EmployeTableHead from './EmployeTableHead';
import RoleManageModal from './RoleManageModal';
import RoleTableHead from './RoleTableHead';



const { Option } = Select;

function EmployeeManagement() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('employee');



  const router = useNavigate();


  // State for institution and department data
  const [institutions, setInstitutions] = useState([
    {
      key: '1',
      id: 1,
      name: 'Brookwood Baptist Health',
      email: 'john.doe@example.com',
      phone: '+123 456 7890',
      establishedYear: '1996',
      website: 'www.example.website.com',
      location: 'Brookwood Baptist Health',
      address: '500 N. Eastern Blvd. Montgomery, AL 36117',
      totalDepartment: 5,
      totalEmployee: 300,
      status: 'Active'
    },
    // Duplicate entries for demo purposes
    ...Array.from({ length: 8 }, (_, i) => ({
      key: (i + 2).toString(),
      id: i + 2,
      name: 'Brookwood Baptist Health',
      email: 'john.doe@example.com',
      phone: '+123 456 7890',
      establishedYear: '1996',
      website: 'www.example.website.com',
      location: 'Brookwood Baptist Health',
      address: '500 N. Eastern Blvd. Montgomery, AL 36117',
      totalDepartment: 5,
      totalEmployee: 300,
      status: 'Active'
    }))
  ]);

  const [departments, setDepartments] = useState([
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
  const [isNewInstitutionModalVisible, setIsNewInstitutionModalVisible] = useState(false);
  const [isNewDepartmentModalVisible, setIsNewDepartmentModalVisible] = useState(false);

  // Handle institution creation
  const handleCreateInstitution = (values) => {
    const newInstitution = {
      key: (institutions.length + 1).toString(),
      id: institutions.length + 1,
      name: values.name,
      email: values.email,
      phone: values.phone,
      establishedYear: values.establishedYear,
      website: values.website,
      address: values.address,
      location: values.geofencingLocation || values.location,
      totalDepartment: 0,
      totalEmployee: 0,
      status: 'Active'
    };

    setInstitutions([...institutions, newInstitution]);
    setIsNewInstitutionModalVisible(false);
    message.success('Institution created successfully');
  };

  // Handle department creation
  const handleCreateDepartment = (values) => {
    const newDepartment = {
      key: (departments.length + 1).toString(),
      id: departments.length + 1,
      institution: values.institution,
      name: values.name,
      totalEmployee: values.totalEmployee,
      status: 'Active'
    };

    setDepartments([...departments, newDepartment]);
    setIsNewDepartmentModalVisible(false);
    message.success('Department created successfully');
  };

  const employeeColumns = [
    "ID",
    "Employee Name",
    "Institution",
    "Department",
    "Role",
    "Email",
    "Phone",
    "Weekend",
    "Shift Schedule",
    "Status",
    "Action",
  ];

  const departmentColumns = [
    "SL",
    "Role Name",
    "Institution",
    "Department",
    "Created",
    "Status",
    "Action"
  ];

  const employeeData = [
    {
      id: 1,
      employeName: "Dr. John Doe",
      institution: "Brookwood Baptist Health",
      department: "Clinical",
      role: "Doctor",
      email: "john.doe@example.com",
      phone: "+123 456 7890",
      weekend: "Wednesday",
      shiftSchedule: "9:00 AM - 5:00 PM",
      status: "Active",
    },

     {
      id: 1,
      employeName: "Dr. John Doe",
      institution: "Brookwood Baptist Health",
      department: "Clinical",
      role: "Doctor",
      email: "john.doe@example.com",
      phone: "+123 456 7890",
      weekend: "Wednesday",
      shiftSchedule: "9:00 AM - 5:00 PM",
      status: "Active",
    },
    
  ];

  const departmentData = [
    {
      id: 1,
      roleName: "Doctor",
      institution: "Brookwood Baptist Health",
      department: "Clinical",
      created: "Jan 01, 2025",
      status: "Active"
    },
    {
      id: 2,
      roleName: "Doctor",
      institution: "Brookwood Baptist Health",
      department: "Clinical",
      created: "Jan 01, 2025",
      status: "Active"
    },
  ];


 const departmentOptions = [
    { value: 'All', label: 'All' },
    { value: 'Clinical', label: 'Clinical' },
    { value: 'SparkTech', label: 'Spark Tech' },
    { value: 'Softvance', label: 'Softvance' },
  ];

   const institutionOptions = [
    { value: 'All', label: 'All' },
    { value: 'BrookwoodBaptistHealth', label: 'Brookwood Baptist Health' },
    { value: ' USA Health ', label: 'USA Health ' },
    { value: ' University of Alabama Hospital ', label: ' University of Alabama Hospital ' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <div className="mb-6 flex justify-between w-full">
        <div className='w-full'>
          <Button
            type={activeTab === 'employee' ? 'primary' : 'default'}
            className={`mr-2 ${activeTab === 'employee' ? 'bg-[#336C79]' : ''}`}
            onClick={() => setActiveTab('employee')}
          >
            Employee
          </Button>
          <Button
            type={activeTab === 'role' ? 'primary' : 'default'}
            className={activeTab === 'role' ? 'bg-[#336C79]' : ''}
            onClick={() => setActiveTab('role')}
          >
            Role
          </Button>
        </div>
        <div className='w-full'>
          {activeTab === 'employee' && (

            <div className='flex  items-center gap-3 w-full'>

              <div className='w-4/12'>
                <CustomFilterDropdown options={departmentOptions} />
              </div>
              <div className='w-4/12'>
                <CustomFilterDropdown options={institutionOptions} />
              </div>

              <Button
                type="primary"
                className="bg-[#336C79] w-4/12"
                onClick={() => router("/employee-management/add-new-Employee")}
              >
                Add New Employee
              </Button>

            </div>
          )}
          {activeTab === 'role' && (
            <div className='flex items-center justify-end gap-3'>
              <Button
                type="primary"
                className="bg-[#336C79]"
                onClick={() => setIsNewInstitutionModalVisible(true)}
              >
                Create New Role
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-md shadow">
        {activeTab === 'employee' ? (
          <EmployeTableHead activeTab={activeTab} data={employeeData} columns={employeeColumns} />
        ) : (
          <RoleTableHead activeTab={activeTab} data={departmentData} columns={departmentColumns} />
        )}
      </div>

      <RoleManageModal
        mode="create"
        visible={isNewInstitutionModalVisible}
        onCancel={() => setIsNewInstitutionModalVisible(false)}
        onCreate={handleCreateDepartment}
        institutions={institutions}
      />
    </div>
  );
}

export default EmployeeManagement;