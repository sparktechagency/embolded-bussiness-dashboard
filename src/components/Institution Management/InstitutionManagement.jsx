import { Button, Form, Input, message, Modal, Upload, Select, Row, Col } from 'antd';
import { useState } from 'react';
import DepertmentTableHead from './DepertmentTableHead';
import InstitutionTableHead from './InstitutionTableHead';
import InstitutionFormModal from './InstitutionFormModal';
import DepartmentFormModal from './DepartmentFormModal';


const { Option } = Select;

function App() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('institution');

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
        console.log(values);
  };  

  // Handle department creation
  const handleCreateDepartment = (values) => {
    const newDepartment = {
      key: (departments.length + 1).toString(),
      id: departments.length + 1,
      institution: values.institution,
      name: values.name,
      totalEmployee: values.totalEmployee || 0,
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
    "Phone Number",
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
            type={activeTab === 'institution' ? 'primary' : 'default'}
            className={`mr-2 ${activeTab === 'institution' ? 'bg-[#336C79]' : ''}`}
            onClick={() => setActiveTab('institution')}
          >
            Institution
          </Button>
          <Button
            type={activeTab === 'department' ? 'primary' : 'default'}
            className={activeTab === 'department' ? 'bg-[#336C79]' : ''}
            onClick={() => setActiveTab('department')}
          >
            Department
          </Button>
        </div>
        <div>
          {activeTab === 'department' && (
            <Button
              type="primary"
              className="bg-[#336C79] mr-2"
              onClick={() => setIsNewDepartmentModalVisible(true)}
            >
              Create New Department
            </Button>
          )}
          {activeTab === 'institution' && (
            <div className='flex items-center gap-3'>
              <Button
                type="primary"
                className="bg-[#336C79]"
                onClick={() => setIsNewDepartmentModalVisible(true)}
              >
                Create New Department
              </Button>

              <Button
                type="primary"
                className="bg-[#336C79]"
                onClick={() => setIsNewInstitutionModalVisible(true)}
              >
                Create New Institution
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className=" rounded-md">
        {activeTab === 'institution' ? (
          <InstitutionTableHead activeTab={activeTab} data={institutionData} columns={institutionColumns} />
        ) : (
          <DepertmentTableHead activeTab={activeTab} data={departmentData} columns={departmentColumns} />
        )}
      </div>

      {/* Using the separated modals */}
      <InstitutionFormModal
        mode="create"
        visible={isNewInstitutionModalVisible}
        onCancel={() => setIsNewInstitutionModalVisible(false)}
        onSubmit={handleCreateInstitution} 
      />

      <DepartmentFormModal
        mode="create"
        visible={isNewDepartmentModalVisible}
        onCancel={() => setIsNewDepartmentModalVisible(false)}
        onSubmit={handleCreateDepartment} 
        institutions={institutions}
      />
    </div>
  );
}

export default App;