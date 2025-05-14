import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';

const AssignShiftModal = ({ 
  visible, 
  onCancel, 
  onSubmit,
  institutions = [],
  departments = [],
  shifts = [],
  initialValues = {}
}) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
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
              options={institutions.map(institution => ({
                value: institution.id,
                label: institution.name
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
              placeholder="Select Department"
              size="middle"
              suffixIcon={suffixIcon}
              options={departments.map(department => ({
                value: department.id,
                label: department.name
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
            name="employeeName" 
            label={<span style={{ fontWeight: 600, fontSize: '16px' }}>Employee Name</span>}
          >
            <Input 
              placeholder="Employee Name" 
              size="large" 
              defaultValue="Sabbir Ahmed"
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
              options={shifts.map(shift => ({
                value: shift.id,
                label: shift.name
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
        gap:"10px",
        paddingTop: '15px'
      }}>
        <Button 

          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button 
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