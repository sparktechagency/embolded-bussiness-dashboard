import { Button, message, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentFormModal from '../Institution Management/DepartmentFormModal';
import InstitutionFormModal from '../Institution Management/InstitutionFormModal';
import EmployeTableHead from './EmployeTableHead';
import RoleTableHead from './RoleTableHead';
import RoleManageModal from './RoleManageModal';



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

  const institutionColumns = [
    "SL",
    "Institution",
    "Email",
    "Phone",
    "Established Year",
    "Location Name",
    "Total Department",
    "Total Employee",
    "Status",
    "Action"
  ];

  const departmentColumns = [
    "SL",
    "Institution",
    "Department Name",
    "Total Employee",
    "Status",
    "Action"
  ];

  const institutionData = [
    {
      id: 1,
      institution: "Brookwood Baptist Health",
      email: "C7oZ6@example.com",
      phone: "+123 456 7890",
      establishedYear: "1996",
      location: "Brookwood Baptist Health",
      totalDepartment: 5,
      totalEmployee: 300,
      status: "Active"
    },
    {
      id: 2,
      institution: "Brookwood Baptist Health",
      email: "C7oZ6@example.com",
      phone: "+123 456 7890",
      establishedYear: "1996",
      location: "Brookwood Baptist Health",
      totalDepartment: 5,
      totalEmployee: 300,
      status: "Active"
    },
  ];

  const departmentData = [
    {
      id: 1,
      institution: "Brookwood Baptist Health",
      name: "Spark tech",
      totalEmployee: 300,
      status: "Active"
    },
    {
      id: 2,
      institution: "Brookwood Baptist Health",
      name: "Spark tech",
      totalEmployee: 300,
      status: "Active"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between">
        <div>
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
        <div>
          {activeTab === 'employee' && (

          <div className='flex items-center gap-3'>
            


            <Button
            type="primary"
            className="bg-[#336C79]"
            onClick={() => router("/employee-management/add-new-Employee")}
          >
            Add New Employee
          </Button>

          </div>
          )}
          {activeTab === 'role' && (
            <div className='flex items-center gap-3'>
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
          <EmployeTableHead activeTab={activeTab} data={institutionData} columns={institutionColumns} />
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