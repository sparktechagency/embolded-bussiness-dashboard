import { Button, message, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateDesignationMutation } from '../../features/Designation/designationApi';
import { useGetAllDepartmentQuery } from '../../features/instituteManagement/DepartmentManagementApi';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';
import CustomFilterDropdown from '../CustomFilterDropdown';
import EmployeTableHead from './EmployeTableHead';
import RoleManageModal from './RoleManageModal';
import RoleTableHead from './RoleTableHead';

const { Option } = Select;

function EmployeeManagement() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('employee');
  const { data: institutionData, isLoading: instituteLoading } = useGetAllInstitutionsQuery();
  const { data: department, isLoading: departmentLoading } = useGetAllDepartmentQuery();
  const [createDesignation, { isLoading: creatingLoading }] = useCreateDesignationMutation();

  const router = useNavigate();

  // State for modals
  const [isNewInstitutionModalVisible, setIsNewInstitutionModalVisible] = useState(false);
  const [isNewDepartmentModalVisible, setIsNewDepartmentModalVisible] = useState(false);

  // Handle department creation
  const handleCreateDesignation = async (values) => {
    console.log('Creating role with values:', values);
    const data = {
      designationName: values.departmentName,
      institutionID: values.institutionId,
      departmentID: values.departmentId,
    }
    try {
      const response = await createDesignation(data);
      setIsNewInstitutionModalVisible(false);
      if (response.success) {
        message.success(response.message || 'Designation created successfully');
      }
    } catch (error) {
      console.error('Error creating role:', error);
      message.error(error.message || 'Failed to create role');

    }

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

  const handleInstitutionChange = (value) => {
    console.log("Selected Institution:", value);
    // Implement logic to filter employees based on selected institution
  };

  return (
    <div className="p-6 bg-gray-50 ">
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
            Designation
          </Button>
        </div>
        <div className='w-full'>
          {activeTab === 'employee' && (
            <div className='flex  items-center gap-3 w-full'>
              <div className='w-4/12'>
                <CustomFilterDropdown
                  options={institutionData?.data.data}
                  placeholder="Choose an institution"
                  showAllOption={true}
                  allOptionLabel="All Institutions"
                  allOptionValue="all"
                  onChange={handleInstitutionChange}
                  labelKey="institutionName"  // "Anup", "Test"
                  valueKey="_id"
                  width="300px"
                />
              </div>
              <div className='w-4/12'>
                <CustomFilterDropdown
                  options={department?.data?.data}
                  labelKey="departmentName"
                  valueKey="_id"
                  placeholder="Choose an department"
                  showAllOption={true}
                  allOptionLabel="All departments"
                  allOptionValue="all"
                  onChange={handleInstitutionChange}
                  width="300px"
                />
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

      <div className=" rounded-md">
        {activeTab === 'employee' ? (
          <EmployeTableHead activeTab={activeTab} columns={employeeColumns} />
        ) : (
          <RoleTableHead activeTab={activeTab} columns={departmentColumns} />
        )}
      </div>

      <RoleManageModal
        mode="create"
        visible={isNewInstitutionModalVisible}
        onCancel={() => setIsNewInstitutionModalVisible(false)}
        onSubmit={handleCreateDesignation}
        institutions={institutionData?.data?.data || []}
        departments={department?.data?.data || []}
      />
    </div>
  );
}

export default EmployeeManagement;