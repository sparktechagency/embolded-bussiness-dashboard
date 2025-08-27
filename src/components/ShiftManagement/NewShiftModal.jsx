import { Button, Form, Input, Modal, TimePicker } from 'antd';
import dayjs from 'dayjs';
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

  // Function to convert ISO date string to time only
  const convertToTimeOnly = (isoString) => {
    if (!isoString) return null;

    // If it's already in HH:mm format, use it directly
    if (typeof isoString === 'string' && isoString.includes(':') && !isoString.includes('T')) {
      return dayjs(isoString, 'HH:mm');
    }

    // If it's ISO string, extract time part
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return dayjs(`${hours}:${minutes}`, 'HH:mm');
  };

  // Set form values when mode changes or initialValues update
  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && initialValues) {
        console.log("Setting form values for edit mode:", initialValues);

        form.setFieldsValue({
          name: initialValues.name,
          startTime: convertToTimeOnly(initialValues.startTime),
          endTime: convertToTimeOnly(initialValues.endTime)
        });
      } else {
        form.resetFields();
      }
    }
  }, [mode, visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log("Form values before formatting:", values);

      // Convert dayjs objects to time strings
      const formattedValues = {
        ...values,
        startTime: values.startTime ? values.startTime.format('HH:mm') : null,
        endTime: values.endTime ? values.endTime.format('HH:mm') : null
      };

      console.log("Formatted values being sent:", formattedValues);
      onSubmit(formattedValues);
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
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
      title={<span style={{ fontWeight: "bold", color: "#336C79" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={true}
      width={500}
      zIndex={1000}
      destroyOnClose={true}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={<span style={{ fontWeight: "bold" }}>Name</span>}
          rules={[{ required: true, message: 'Please input shift name!' }]}
        >
          <Input placeholder="Write Shift Name" size="large" />
        </Form.Item>

        <Form.Item label={<span style={{ fontWeight: "bold" }}>Time</span>}>
          <Form.Item
            name="startTime"
            style={{ marginBottom: 16 }}
            rules={[{ required: true, message: 'Please select start time!' }]}
          >
            <TimePicker
              placeholder="Start Time"
              style={{ width: '100%', height: '40px' }}
              format="HH:mm"
              size="large"
              showNow={false}
              use12Hours={false}
              getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
            />
          </Form.Item>

          <Form.Item
            name="endTime"
            rules={[{ required: true, message: 'Please select end time!' }]}
          >
            <TimePicker
              placeholder="End Time"
              style={{ width: '100%', height: '40px' }}
              format="HH:mm"
              size="large"
              showNow={false}
              use12Hours={false}
              getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewShiftModal;