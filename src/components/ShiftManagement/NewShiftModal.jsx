import { Button, Form, Input, Modal, TimePicker } from 'antd';
import { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';

const ShiftModal = ({ 
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
    ? 'Create New Shift' 
    : 'Edit Shift';

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
          name: "",
          startTime: null,
          endTime: null
        }}
      >
        <Form.Item 
          name="name" 
          label={<span style={{ fontWeight: "bold", fontSize: '18px' }}>Name</span>}
          rules={[{ required: true, message: 'Please input shift name!' }]}
        >
          <Input placeholder="Write Shift Name" size="large" />
        </Form.Item>
        
        <Form.Item 
          label={<span style={{ fontWeight: "bold", fontSize: '18px' }}>Time</span>}
        >
          <Form.Item 
            name="startTime" 
            style={{ marginBottom: 16 }}
            rules={[{ required: true, message: 'Please select start time!' }]}
          >
            <TimePicker 
              placeholder="Start Time" 
              style={{ width: '100%' }}
              size="large"
              format="HH:mm"
              suffixIcon={<ClockCircleOutlined />}
            />
          </Form.Item>
          
          <Form.Item 
            name="endTime"
            rules={[{ required: true, message: 'Please select end time!' }]}
          >
            <TimePicker 
              placeholder="End Time" 
              style={{ width: '100%' }}
              size="large"
              format="HH:mm"
              suffixIcon={<ClockCircleOutlined />}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShiftModal;