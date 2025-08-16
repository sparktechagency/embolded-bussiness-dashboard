import { Button, Form, Input, Modal, Select, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';

const { Option } = Select;

const RoleManageModal = ({
  mode = 'create',
  visible,
  onCancel,
  onSubmit,
  departments = [],
  institutions = [],
  initialValues = {},
  creatingLoading
}) => {
  const [form] = Form.useForm();
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Memoize the initial values to prevent unnecessary changes
  const memoizedInitialValues = useMemo(() => initialValues, [
    initialValues.institution,
    initialValues.department,
    initialValues.departmentName,
    initialValues.institutionId,
    initialValues.departmentId
  ]);

  useEffect(() => {
    if (visible) {
      setLoading(true);
      if (mode === 'edit' && memoizedInitialValues) {
        form.setFieldsValue({
          institution: memoizedInitialValues.institution,
          department: memoizedInitialValues.department,
          departmentName: memoizedInitialValues.departmentName
        });
        setSelectedInstitution(memoizedInitialValues.institutionId);
        setSelectedDepartment(memoizedInitialValues.departmentId);

        if (memoizedInitialValues.institutionId) {
          const filtered = departments.filter(dept =>
            dept.institutionID && dept.institutionID._id === memoizedInitialValues.institutionId
          );
          setFilteredDepartments(filtered);
        }
      } else {
        form.resetFields();
        setSelectedInstitution(null);
        setSelectedDepartment(null);
        setFilteredDepartments([]);
      }
      setLoading(false);
    }
  }, [visible, mode, memoizedInitialValues, form, departments]);

  const handleInstitutionChange = (value) => {
    setSelectedInstitution(value);
    setSelectedDepartment(null);
    form.setFieldsValue({
      department: undefined,
      departmentName: ''
    });

    if (value && departments.length > 0) {
      const filtered = departments.filter(dept =>
        dept.institutionID && dept.institutionID._id === value
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments([]);
    }
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    const selectedDept = filteredDepartments.find(dept => dept._id === value);
    if (selectedDept) {
      form.setFieldsValue({
        departmentName: selectedDept.departmentName
      });
    }
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const submitData = {
        ...values,
        institutionId: selectedInstitution,
        departmentId: selectedDepartment
      };
      onSubmit(submitData);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedInstitution(null);
    setSelectedDepartment(null);
    setFilteredDepartments([]);
    onCancel();
  };

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#336C79" }}>
        {mode === 'create' ? 'Create New Designation' : 'Edit Designation'}
      </span>}
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={creatingLoading}
          onClick={handleSubmit}
          className="bg-[#336C79]"
        >
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      ]}
      closable={false}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="institution"
            label="Select Institution"
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
            label="Select Department"
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
            label="Designation Name"
            rules={[{ required: true, message: 'Designation name is required!' }]}
          >
            <Input placeholder="Enter designation name" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default RoleManageModal;