import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

const LocationModal = ({
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
    ? 'Create Location'
    : 'Edit Location';

  const modalFooter = (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        style={{ marginRight: 8, padding: '0 30px', height: '40px' }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        style={{  padding: '0 40px', height: '40px', backgroundColor: '#336C79', borderColor: '#336C79' }}
        onClick={handleSubmit}
      >
        {mode === 'create' ? 'Save Changes' : 'Update'}
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
        initialValues={mode === 'edit' ? initialValues : {
          name: "",
          latitude: '',
          longitude: '',
          ssid: '',
          ipAddress: '',
          radius: ''
        }}
      >
        <Form.Item
          name="name"
          label={<span style={{ fontWeight: "bold",}}>Name</span>}
          rules={[{ required: true, message: 'Please input location name!' }]}
        >
          <Input placeholder="Location Name" size="large" />
        </Form.Item>

        <Form.Item
          name="latitude"
          label={<span style={{ fontWeight: "bold", }}>Latitude</span>}
          rules={[{ required: true, message: 'Please input latitude!' }]}
        >
          <Input placeholder="Latitude" size="large" />
        </Form.Item>

        <Form.Item
          name="longitude"
          label={<span style={{ fontWeight: "bold", }}>Longitude</span>}
          rules={[{ required: true, message: 'Please input longitude!' }]}
        >
          <Input placeholder="Longitude" size="large" />
        </Form.Item>

        <Form.Item
          name="ssid"
          label={<span style={{ fontWeight: "bold",  }}>Wi-Fi SSID</span>}
          rules={[{ required: true, message: 'Please input Wi-Fi SSID!' }]}
        >
          <Input placeholder="Wi-Fi SSID" size="large" />
        </Form.Item>

        <Form.Item
          name="ipAddress"
          label={<span style={{ fontWeight: "bold", }}>Wi-Fi IP Address</span>}
          rules={[{ required: true, message: 'Please input Wi-Fi IP address!' }]}
        >
          <Input placeholder="Wi-Fi IP Address" size="large" />
        </Form.Item>

        <Form.Item
          name="radius"
          label={<span style={{ fontWeight: "bold", }}>Radius</span>}
          rules={[{ required: true, message: 'Please input radius!' }]}
        >
          <Input placeholder="Radius" size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LocationModal;
