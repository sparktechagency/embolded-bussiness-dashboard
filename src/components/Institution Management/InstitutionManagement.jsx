import { Button, Grid, message, Select } from 'antd';
import { useState } from 'react';
import { useCreateDepartmentMutation } from '../../features/instituteManagement/DepartmentManagementApi';
import { useCreateInstitueMutation } from '../../features/instituteManagement/instituteManagementApi';
import DepartmentFormModal from './DepartmentFormModal';
import DepertmentTableHead from './DepertmentTableHead';
import InstitutionFormModal from './InstitutionFormModal';
import InstitutionTableHead from './InstitutionTableHead';

const { Option } = Select;
const { useBreakpoint } = Grid;

function App() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('institution');
  const [isNewInstitutionModalVisible, setIsNewInstitutionModalVisible] = useState(false);
  const [isNewDepartmentModalVisible, setIsNewDepartmentModalVisible] = useState(false);
  const [createInstitution, { isLoading }] = useCreateInstitueMutation();
  const [createDepartment, { isLoading: creatingDepartment }] = useCreateDepartmentMutation();

  // Use Ant Design's breakpoint utility for responsive design
  const screens = useBreakpoint();
  const isMobile = !screens.md;

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
      departmentName: values.departmentName,
      institutionID: values?.institution
    }
    try {
      const response = await createDepartment(data);
      message.success(response.message || 'Department created successfully');
      setIsNewDepartmentModalVisible(false);
    } catch (error) {
      console.error('Error creating department:', error);
      message.error(error?.message);
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
    <div className="sm:p-6 p-1 bg-gray-50 sm:w-full w-screen overflow-hidden">
      <div className={`mb-6 ${isMobile ? 'flex flex-col gap-4' : 'flex justify-between'}`}>
        <div className={isMobile ? 'w-full' : ''}>
          <Button
            type={activeTab === 'institution' ? 'primary' : 'default'}
            className={`mr-2 ${activeTab === 'institution' ? 'bg-[#336C79]' : ''} ${isMobile ? 'w-full mb-2' : ''}`}
            onClick={() => setActiveTab('institution')}
            size={isMobile ? 'large' : 'middle'}
          >
            Institution
          </Button>
          <Button
            type={activeTab === 'department' ? 'primary' : 'default'}
            className={`${activeTab === 'department' ? 'bg-[#336C79]' : ''} ${isMobile ? 'w-full' : ''}`}
            onClick={() => setActiveTab('department')}
            size={isMobile ? 'large' : 'middle'}
          >
            Department
          </Button>
        </div>
        <div className={isMobile ? 'w-full mt-2' : ''}>
          {activeTab === 'department' && (
            <Button
              type="primary"
              className={`bg-[#336C79] ${isMobile ? 'w-full' : 'mr-2'}`}
              onClick={() => setIsNewDepartmentModalVisible(true)}
              size={isMobile ? 'large' : 'middle'}
              block={isMobile}
            >
              Create New Department
            </Button>
          )}
          {activeTab === 'institution' && (
            <div className={`${isMobile ? 'flex flex-col' : 'flex items-center gap-3'}`}>
              <Button
                type="primary"
                className="bg-[#336C79]"
                onClick={() => setIsNewInstitutionModalVisible(true)}
                size={isMobile ? 'large' : 'middle'}
                block={isMobile}
              >
                Create New Institution
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md sm:overflow-hidden overflow-x-auto">
        {activeTab === 'institution' ? (
          <InstitutionTableHead
            activeTab={activeTab}
            columns={institutionColumns}
            isMobile={isMobile}
          />
        ) : (
          <DepertmentTableHead
            activeTab={activeTab}
            data={departmentData}
            columns={departmentColumns}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* Using the separated modals */}
      <InstitutionFormModal
        mode="create"
        visible={isNewInstitutionModalVisible}
        onCancel={() => setIsNewInstitutionModalVisible(false)}
        onSubmit={handleCreateInstitution}
        loading={isLoading}
        isMobile={isMobile}
      />

      <DepartmentFormModal
        mode="create"
        visible={isNewDepartmentModalVisible}
        onCancel={() => setIsNewDepartmentModalVisible(false)}
        onSubmit={handleCreateDepartment}
        loading={creatingDepartment}
        isMobile={isMobile}
      />
    </div>
  );
}

export default App;