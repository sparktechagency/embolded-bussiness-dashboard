import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const RoleManageModal = ({
  mode = 'create', // 'create' or 'edit'
  visible,
  onCancel,
  onSubmit,
  departments = [],
  institutions = [],
  initialValues = {}
}) => {
  const [form] = Form.useForm();
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // Initialize form when modal opens
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        if (mode === 'edit' && initialValues) {
          form.setFieldsValue(initialValues);
          if (initialValues.institutionId) {
            setSelectedInstitution(initialValues.institutionId);
          }
          if (initialValues.departmentId) {
            setSelectedDepartment(initialValues.departmentId);
          }
        } else if (mode === 'create') {
          form.resetFields();
          setSelectedInstitution(null);
          setSelectedDepartment(null);
          setFilteredDepartments([]);
        }
      }, 150)
      return () => clearTimeout(timer);
    }
  }, [mode, visible, form]); // Removed initialValues from dependencies to prevent infinite loop

  // Filter departments based on selected institution
  useEffect(() => {
    if (selectedInstitution && departments.length > 0) {
      const filtered = departments.filter(dept =>
        dept.institutionID && dept.institutionID._id === selectedInstitution
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments([]);
    }
  }, [selectedInstitution]);

  const handleInstitutionChange = (value) => {
    setSelectedInstitution(value);
    setSelectedDepartment(null);
    // Clear department field when institution changes
    form.setFieldsValue({
      department: undefined,
      departmentName: ''
    });
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    // Find the selected department and auto-fill the department name
    const selectedDept = filteredDepartments.find(dept => dept._id === value);
    if (selectedDept) {
      form.setFieldsValue({
        departmentName: selectedDept.departmentName
      });
    }
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      // Add selected institution and department IDs to the values
      const submitData = {
        ...values,
        institutionId: selectedInstitution,
        departmentId: selectedDepartment
      };
      onSubmit(submitData);

      // Reset form and state after successful submission
      if (mode === 'create') {
        form.resetFields();
        setSelectedInstitution(null);
        setSelectedDepartment(null);
        setFilteredDepartments([]);
      }
    }).catch(error => {
      console.error('Form validation failed:', error);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedInstitution(null);
    setSelectedDepartment(null);
    setFilteredDepartments([]);
    onCancel();
  };

  const modalFooter = (
    <div>
      <Button
        style={{ paddingLeft: "30px", paddingRight: "30px", fontSize: "16px", marginRight: 8 }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "16px" }}
        onClick={handleSubmit}
        className="bg-[#336C79]"
      >
        {mode === 'create' ? 'Create' : 'Update'}
      </Button>
    </div>
  );

  const modalTitle = mode === 'create'
    ? 'Create New Role'
    : 'Edit Role';

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#336C79", paddingTop: "20px", paddingBottom: "20px" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={false}
      destroyOnClose={true} // This ensures the modal is completely reset when closed
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          roleName: "",
          institution: undefined,
          department: undefined,
          departmentName: ""
        }}
      >
        <Form.Item
          name="institution"
          label={<span style={{ fontWeight: "bold" }}>Select Institution</span>}
          rules={[{ required: true, message: 'Please select an institution!' }]}
        >
          <Select
            placeholder="Select an institution"
            onChange={handleInstitutionChange}
            value={selectedInstitution}
            allowClear
          >
            {institutions.map(institution => (
              <Option key={institution._id} value={institution._id}>
                {institution.institutionName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="department"
          label={<span style={{ fontWeight: "bold" }}>Select Department</span>}
          rules={[{ required: true, message: 'Please select a department!' }]}
        >
          <Select
            placeholder="Select a department"
            onChange={handleDepartmentChange}
            value={selectedDepartment}
            disabled={!selectedInstitution}
            allowClear
          >
            {filteredDepartments.map(department => (
              <Option key={department._id} value={department._id}>
                {department.departmentName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="departmentName"
          label={<span style={{ fontWeight: "bold" }}>Department Name</span>}
          rules={[{ required: true, message: 'Please select a department first!' }]}
        >
          <Input
            placeholder="Department name will appear here"
            readOnly
            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleManageModal;