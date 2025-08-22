import { DownOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllDepartmentQuery } from '../../features/instituteManagement/DepartmentManagementApi';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';
import { useGetAllShiftQuery } from '../../features/shiftManagement/shiftApi';

const AssignShiftModal = ({
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  loading
}) => {
  const [form] = Form.useForm();
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // Only fetch data when modal is visible
  const { data: allInstitute } = useGetAllInstitutionsQuery(undefined, { skip: !visible });
  const { data: allDepartment } = useGetAllDepartmentQuery(undefined, { skip: !visible });
  const { data: allShift } = useGetAllShiftQuery(undefined, { skip: !visible });

  // Memoize the data to prevent unnecessary re-renders
  const institutes = useMemo(() => allInstitute?.data?.data || [], [allInstitute]);
  const departments = useMemo(() => allDepartment?.data?.data || [], [allDepartment]);
  const shifts = useMemo(() => allShift?.data?.data || [], [allShift]);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
      if (initialValues.institution) {
        setSelectedInstitution(initialValues.institution);
      }
    } else {
      form.resetFields();
      setSelectedInstitution(null);
      setFilteredDepartments([]);
    }
  }, []);

  useEffect(() => {
    if (selectedInstitution && departments.length > 0) {
      const filtered = departments.filter(
        dept => dept.institutionID?._id === selectedInstitution
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments([]);
    }
  }, [selectedInstitution, departments]);

  const handleSubmit = () => {
    form.validateFields().then(values => {

      const output = {
        institutionID: values.institution,
        departmentID: values.department,
        employeeID: values.employeeId,
        shiftID: values.shift
      };
      onSubmit(output);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedInstitution(null);
    setFilteredDepartments([]);
    onCancel();
  };

  const handleInstitutionChange = (value) => {
    setSelectedInstitution(value);
    form.setFieldsValue({ department: undefined });
  };

  const suffixIcon = <DownOutlined style={{ fontSize: '14px' }} />;

  return (
    <Modal
      title={<div style={{
        fontWeight: 600,
        color: "#336C79",
        fontSize: '22px',
        paddingBottom: '20px',
        borderBottom: '1px solid #f0f0f0'
      }}>Assign Shift</div>}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      closable={true}
      width={600}
      closeIcon={<span style={{ fontSize: '22px' }}>×</span>}
    >
      <div style={{ padding: '24px 0' }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
        >
          <Form.Item
            name="institution"
            label={<span style={{ fontWeight: 600, fontSize: '16px' }}>Institution</span>}
            rules={[{ required: true, message: 'Please select an institution!' }]}
          >
            <Select
              placeholder="Select Institution"
              size="middle"
              suffixIcon={suffixIcon}
              onChange={handleInstitutionChange}
              loading={!allInstitute}
              options={institutes.map(institute => ({
                value: institute._id,
                label: institute.institutionName
              }))}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          </Form.Item>

          <Form.Item
            name="department"
            label={<span style={{ fontWeight: 600, fontSize: '16px' }}>Department</span>}
            rules={[{ required: true, message: 'Please select a department!' }]}
          >
            <Select
              placeholder={selectedInstitution ? "Select Department" : "First select an institution"}
              size="middle"
              suffixIcon={suffixIcon}
              disabled={!selectedInstitution}
              loading={!allDepartment}
              options={filteredDepartments.map(department => ({
                value: department._id,
                label: department.departmentName
              }))}
            />
          </Form.Item>

          <Form.Item
            name="employeeId"
            label={<span style={{ fontWeight: 600, fontSize: '16px' }}>Employee ID</span>}
            rules={[{ required: true, message: 'Please enter employee ID!' }]}
          >
            <Input
              placeholder="Enter Your Employee ID"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="shift"
            label={<span style={{ fontWeight: 600, fontSize: '16px' }}>Shift</span>}
            rules={[{ required: true, message: 'Please select a shift!' }]}
          >
            <Select
              placeholder="Select Your Shift"
              size="large"
              suffixIcon={suffixIcon}
              loading={!allShift}
              options={shifts.map(shift => ({
                value: shift._id,
                label: shift.shiftName
              }))}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          </Form.Item>
        </Form>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '1px solid #f0f0f0',
        gap: "10px",
        paddingTop: '15px'
      }}>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          loading={loading}
          type="primary"
          onClick={handleSubmit}
        >
          Assign Employee
        </Button>
      </div>
    </Modal>
  );
};

export default AssignShiftModal;