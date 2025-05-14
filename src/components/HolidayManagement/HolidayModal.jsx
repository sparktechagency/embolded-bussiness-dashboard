import { CalendarOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const HolidayModal = ({
  mode = 'create', // 'create' or 'edit'
  visible,
  onCancel,
  onSubmit,
  initialValues = {}
}) => {
  const [form] = Form.useForm();

  // Set form values when mode changes or initialValues update
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

  const modalTitle = mode === 'create'
    ? 'Create New Holiday'
    : 'Edit Holiday';

  const modalFooter = (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        style={{ fontSize: '16px', marginRight: 8, padding: '0 30px', height: '40px' }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        style={{ fontSize: '16px', padding: '0 40px', height: '40px', backgroundColor: '#336C79', borderColor: '#336C79' }}
        onClick={handleSubmit}
      >
        {mode === 'create' ? 'Create' : 'Update'}
      </Button>
    </div>
  );

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#336C79", fontSize: '20px' }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={true}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={mode === 'edit' ? initialValues : {
          type: "Government/Office",
          name: "",
          startDate: null,
          endDate: null
        }}
      >
        <Form.Item
          name="type"
          label={<span style={{ fontWeight: "bold", fontSize: '18px' }}>Holiday Type</span>}
          rules={[{ required: true, message: 'Please select holiday type!' }]}
        >
          <Select placeholder="Select holiday type">
            <Option value="Government/Office">Government/Office</Option>
            <Option value="Religious">Religious</Option>
            <Option value="Cultural">Cultural</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label={<span style={{ fontWeight: "bold", fontSize: '18px' }}>Holiday Name</span>}
          rules={[{ required: true, message: 'Please input holiday name!' }]}
        >
          <Input placeholder="Write Holiday Name" size="large" />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: "bold", fontSize: '18px' }}>Select Date</span>}
        >
          <Form.Item
            name="startDate"
            style={{ marginBottom: 16 }}
            rules={[{ required: true, message: 'Please select start date!' }]}
          >
            <DatePicker
              placeholder="Start Date"
              style={{ width: '100%' }}
              size="large"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            rules={[{ required: true, message: 'Please select end date!' }]}
          >
            <DatePicker
              placeholder="End Date"
              style={{ width: '100%' }}
              size="large"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HolidayModal;