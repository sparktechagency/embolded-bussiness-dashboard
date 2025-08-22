import { Button, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateDesignationMutation } from '../../features/Designation/designationApi';
import { useGetAllDepartmentQuery } from '../../features/instituteManagement/DepartmentManagementApi';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';
import CustomFilterDropdown from '../CustomFilterDropdown';
import EmployeTableHead from './EmployeTableHead';
import RoleManageModal from './RoleManageModal';
import RoleTableHead from './RoleTableHead';


function EmployeeManagement() {
  const search = new URLSearchParams(window.location.search);
  const searchValue = search.get("search") || "";
  const [activeTab, setActiveTab] = useState('employee');
  const { data: institutionData, isLoading: instituteLoading } = useGetAllInstitutionsQuery();
  const { data: departmentData, isLoading: departmentLoading } = useGetAllDepartmentQuery();
  const [createDesignation, { isLoading: creatingLoading }] = useCreateDesignationMutation();

  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewInstitutionModalVisible, setIsNewInstitutionModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleCreateDesignation = async (values) => {
    const data = {
      designationName: values.departmentName,
      institutionID: values.institutionId,
      departmentID: values.departmentId,
    }
    try {
      const response = await createDesignation(data);
      setIsNewInstitutionModalVisible(false);
      if (response.data?.success) {
        message.success(response.data.message || 'Designation created successfully');
      }
    } catch (error) {
      console.error('Error creating role:', error);
      message.error(error.message || 'Failed to create role');
    }
  };

  const employeeColumns = [
    "ID", "Employee Name", "Institution", "Department", "Role",
    "Email", "Phone", "Weekend", "Shift Schedule", "Status", "Action"
  ];

  const departmentColumns = [
    "SL", "Role Name", "Institution", "Department",
    "Created", "Status", "Action"
  ];

  const handleInstitutionChange = (value) => {
    setSelectedInstitution(value === 'all' ? null : value);
    setSelectedDepartment(null);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value === 'all' ? null : value);
  };

  return (
    <div className="p-6 bg-gray-50">
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
            <div className='flex items-center justify-end gap-3 w-full'>
              <div className='w-4/12'>
                <CustomFilterDropdown
                  options={institutionData?.data.data}
                  placeholder="Choose an institution"
                  showAllOption={true}
                  allOptionLabel="All Institutions"
                  allOptionValue="all"
                  onChange={handleInstitutionChange}
                  labelKey="institutionName"
                  valueKey="_id"
                  width="100%"
                  value={selectedInstitution}
                />
              </div>
              <div className='w-4/12'>
                <CustomFilterDropdown
                  options={departmentData?.data?.data}
                  labelKey="departmentName"
                  valueKey="_id"
                  placeholder="Choose a department"
                  showAllOption={true}
                  allOptionLabel="All Departments"
                  allOptionValue="all"
                  onChange={handleDepartmentChange}
                  width="100%"
                  value={selectedDepartment}
                  disabled={!selectedInstitution}
                />
              </div>
              <div className='w-4/12 gap-2'>
                <Button
                  type="primary"
                  className="bg-[#336C79] w-full"
                  onClick={() => navigate("/employee-management/add-new-Employee")}
                >
                  Add New
                </Button>
              </div>
            </div>
          )}
          {activeTab === 'role' && (
            <div className='flex items-center justify-end gap-3'>
              <Button
                type="primary"
                className="bg-[#336C79]"
                onClick={() => setIsNewInstitutionModalVisible(true)}
              >
                Create New Designation
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md">
        {activeTab === 'employee' ? (
          <EmployeTableHead
            activeTab={activeTab}
            columns={employeeColumns}
            institutionFilter={selectedInstitution}
            departmentFilter={selectedDepartment}
            searchTerm={searchValue}
          />
        ) : (
          <RoleTableHead
            activeTab={activeTab}
            columns={departmentColumns}
            institutions={institutionData?.data?.data || []}
            departments={departmentData?.data?.data || []}
            searchTerm={searchValue}
          />
        )}
      </div>

      <RoleManageModal
        mode="create"
        visible={isNewInstitutionModalVisible}
        onCancel={() => setIsNewInstitutionModalVisible(false)}
        onSubmit={handleCreateDesignation}
        institutions={institutionData?.data?.data || []}
        departments={departmentData?.data?.data || []}
        creatingLoading={creatingLoading}
      />
    </div>
  );
}

export default EmployeeManagement;