import { Button, message, Select } from 'antd';
import { useState } from 'react';
import { useCreateDepartmentMutation } from '../../features/instituteManagement/DepartmentManagementApi';
import { useCreateInstitueMutation } from '../../features/instituteManagement/instituteManagementApi';
import DepartmentFormModal from './DepartmentFormModal';
import DepertmentTableHead from './DepertmentTableHead';
import InstitutionFormModal from './InstitutionFormModal';
import InstitutionTableHead from './InstitutionTableHead';


const { Option } = Select;

function App() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('institution');
  const [isNewInstitutionModalVisible, setIsNewInstitutionModalVisible] = useState(false);
  const [isNewDepartmentModalVisible, setIsNewDepartmentModalVisible] = useState(false);
  const [createInstitution, { isLoading }] = useCreateInstitueMutation();
  const [createDepartment, { isLoading: creatingDepartment }] = useCreateDepartmentMutation();



  // Handle institution creation
  const handleCreateInstitution = async (values) => {
    const data = new FormData();
    data.append('institutionName', values.name);
    data.append('address', values.address);
    data.append('email', values.email);
    data.append('phoneNumber', values.phone);
    data.append('institutionWebsiteLink', values.website);
    data.append('establishedYear', values.establishedYear);
    values?.logo?.forEach((file) => {
      if (file.originFileObj) {
        data.append('logo', file.originFileObj);
      }
    });
    try {
      const response = await createInstitution(data);
      setIsNewInstitutionModalVisible(prev => !prev);
      message.success('Institution created successfully');
    } catch (error) {

      console.log('Error creating institution:', error);
      message.error('Failed to create institution');
    }


  };

  // Handle department creation
  const handleCreateDepartment = async (values) => {
    const data = {
      departmentName: values.name,
      institutionID: values?.institution
    }
    try {
      const response = await createDepartment(data);
      console.log('Department created:', response);
      message.success('Department created successfully');
      setIsNewDepartmentModalVisible(false);
    } catch (error) {
      console.error('Error creating department:', error);
      message.error('Failed to create department');
    }
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
    <div className="p-6 bg-gray-50">
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
          <InstitutionTableHead activeTab={activeTab} columns={institutionColumns} />
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
        loading={isLoading}
      />

      <DepartmentFormModal
        mode="create"
        visible={isNewDepartmentModalVisible}
        onCancel={() => setIsNewDepartmentModalVisible(false)}
        onSubmit={handleCreateDepartment}
        loading={creatingDepartment}
      />
    </div>
  );
}

export default App;