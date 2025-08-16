import { ClockCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, TimePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

const NewShiftModal = ({
  mode = 'create', // 'create' or 'edit'
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  loading
}) => {
  const [form] = Form.useForm();

  // Set form values when mode changes or initialValues update
  useEffect(() => {
    if (visible) {
      if (mode === 'edit') {
        form.setFieldsValue({
          name: initialValues.name,
          startTime: initialValues.startTime ? moment(initialValues.startTime) : null,
          endTime: initialValues.endTime ? moment(initialValues.endTime) : null
        });
      } else {
        form.resetFields();
      }
    }
  }, [mode, visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      // Convert moment objects to ISO strings
      const formattedValues = {
        ...values,
        startTime: values.startTime ? values.startTime.toISOString() : null,
        endTime: values.endTime ? values.endTime.toISOString() : null
      };
      onSubmit(formattedValues);
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
        loading={loading}
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
      title={<span style={{ fontWeight: "bold", color: "#336C79", }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={true}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label={<span style={{ fontWeight: "bold", }}>Name</span>}
          rules={[{ required: true, message: 'Please input shift name!' }]}
        >
          <Input placeholder="Write Shift Name" size="large" />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: "bold", }}>Time</span>}
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

export default NewShiftModal;