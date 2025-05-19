import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (mode === 'edit' && visible) {
      form.setFieldsValue(initialValues);
    } else if (mode === 'create' && visible) {
      form.resetFields();
    }
  }, [mode, visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      if (mode === 'create') {
        form.resetFields();
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
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
      title={<span style={{ fontWeight: "bold", color: "#336C79", paddingTop: "20px", paddbottom: "20px" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={mode === 'edit' ? initialValues : {
          name: "",
          institution: undefined, // Changed from "" to undefined
          department: undefined  // Changed from "" to undefined
        }}
      >
        <Form.Item
          name="name"
          label={<span style={{ fontWeight: "bold" }}>Department Name</span>}
          rules={[{ required: true, message: 'Please input department name!' }]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>

        <Form.Item
          name="institution"
          label={<span style={{ fontWeight: "bold" }}>Select Institution</span>}
          rules={[{ required: true, message: 'Please select an institution!' }]}
        >
          <Select placeholder="Select an institution">
            {institutions.map(institution => (
              <Option key={institution.id} value={institution.name}>
                {institution.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="department"
          label={<span style={{ fontWeight: "bold" }}>Select Department</span>}
          rules={[{ required: true, message: 'Please select a department!' }]}  // Fixed error message
        >
          <Select placeholder="Select a department"> 
            {departments.map(department => (
              <Option key={department.id} value={department.name}>
                {department.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleManageModal;