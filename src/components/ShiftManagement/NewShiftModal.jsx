import { ClockCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, TimePicker } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

const NewShiftModal = ({
  mode = 'create',
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  loading,
}) => {
  const [form] = Form.useForm();

  // On open, set fields (edit) or reset (create)
  useEffect(() => {
    if (visible) {
      if (mode === 'edit') {
        // Fix time display: ignore real date, use dummy date for picker
        const start = initialValues.startTime ? moment('1970-01-01').hour(moment(initialValues.startTime).hour()).minute(moment(initialValues.startTime).minute()) : null;
        const end = initialValues.endTime ? moment('1970-01-01').hour(moment(initialValues.endTime).hour()).minute(moment(initialValues.endTime).minute()) : null;

        form.setFieldsValue({
          name: initialValues.name,
          startTime: start,
          endTime: end,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, mode, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      // Convert back to ISO time (preserve only HH:mm, use dummy date)
      const formatTime = (m) => m ? moment('1970-01-01').hour(m.hour()).minute(m.minute()).second(0).toISOString() : null;

      onSubmit({
        ...values,
        startTime: formatTime(values.startTime),
        endTime: formatTime(values.endTime),
      });
    });
  };

  return (
    <Modal
      title={<span style={{ fontWeight: 'bold', color: '#336C79' }}>
        {mode === 'create' ? 'Create New Shift' : 'Edit Shift'}
      </span>}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit} loading={loading} style={{ backgroundColor: '#336C79' }}>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </div>
      }
      width={500}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label={<b>Name</b>} rules={[{ required: true, message: 'Required!' }]}>
          <Input placeholder="Write Shift Name" size="large" />
        </Form.Item>

        <Form.Item label={<b>Time</b>}>
          <Form.Item
            name="startTime"
            rules={[{ required: true, message: 'Start time required!' }]}
            style={{ marginBottom: 16 }}
          >
            <TimePicker
              placeholder="Start Time"
              format="HH:mm"
              size="large"
              style={{ width: '100%' }}
              suffixIcon={<ClockCircleOutlined />}
              // Prevent auto-scroll to current time
              defaultOpenValue={moment('1970-01-01').startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name="endTime"
            rules={[{ required: true, message: 'End time required!' }]}
          >
            <TimePicker
              placeholder="End Time"
              format="HH:mm"
              size="large"
              style={{ width: '100%' }}
              suffixIcon={<ClockCircleOutlined />}
              defaultOpenValue={moment('1970-01-01').startOf('day')}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewShiftModal;