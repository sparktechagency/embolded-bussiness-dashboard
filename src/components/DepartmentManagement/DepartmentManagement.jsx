import { Button, message,  Select, } from 'antd';
import { useState } from 'react';
import DepartmentManagementTableHead from './DepartmentManagementTableHead';
import DepartmentManagementFormModal from './DepartmentManagementFormModal';





const { Option } = Select;

function DepartmentManagement() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('institution');



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
  const [isNewDepartmentModalVisible, setIsNewDepartmentModalVisible] = useState(false);



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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-end">
            <Button
              type="primary"
              className="bg-[#336C79]"
              onClick={() => setIsNewDepartmentModalVisible(true)}
            >
              Create New Department
            </Button>
      </div>


      <DepartmentManagementTableHead activeTab={activeTab} data={departmentData} columns={departmentColumns} />



      <DepartmentManagementFormModal
        mode="create"
        visible={isNewDepartmentModalVisible}
        onCancel={() => setIsNewDepartmentModalVisible(false)}
        onCreate={handleCreateDepartment}
      />
    </div>
  );
}

export default DepartmentManagement;