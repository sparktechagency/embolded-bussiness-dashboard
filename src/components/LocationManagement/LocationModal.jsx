import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';

const LocationModal = ({
  mode = 'create', // 'create' or 'edit'
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  loading
}) => {
  const [form] = Form.useForm();
  const { data: institutionData } = useGetAllInstitutionsQuery();

  // Set form values when mode changes or initialValues update
  useEffect(() => {
    if (mode === 'edit' && visible) {
      // For edit mode, ensure institutionId is set properly
      form.setFieldsValue({
        ...initialValues,
        institutionId: initialValues.institutionId?._id || initialValues.institutionId
      });
    } else if (mode === 'create' && visible) {
      form.resetFields();
    }
  }, [mode, visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      // Don't reset fields here - let parent component handle it after successful API call
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
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
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        style={{ padding: '0 40px', height: '40px', backgroundColor: '#336C79', borderColor: '#336C79' }}
        onClick={handleSubmit}
        loading={loading}
      >
        {mode === 'create' ? 'Create' : 'Update'}
      </Button>
    </div>
  );

  // Validation rules
  const latitudeRules = [
    { required: true, message: 'Please input latitude!' },
    {
      validator: (_, value) => {
        if (value && (value < -90 || value > 90)) {
          return Promise.reject(new Error('Latitude must be between -90 and 90'));
        }
        return Promise.resolve();
      }
    }
  ];

  const longitudeRules = [
    { required: true, message: 'Please input longitude!' },
    {
      validator: (_, value) => {
        if (value && (value < -180 || value > 180)) {
          return Promise.reject(new Error('Longitude must be between -180 and 180'));
        }
        return Promise.resolve();
      }
    }
  ];

  const ipAddressRules = [
    { required: true, message: 'Please input Wi-Fi IP address!' },
    {
      pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      message: 'Please enter a valid IP address!'
    }
  ];

  const radiusRules = [
    { required: true, message: 'Please input radius!' },
    {
      validator: (_, value) => {
        if (value && value <= 0) {
          return Promise.reject(new Error('Radius must be greater than 0'));
        }
        return Promise.resolve();
      }
    }
  ];

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#336C79" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={!loading}
      maskClosable={!loading}
      width={500}
      destroyOnClose={true}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={mode === 'edit' ? {
          ...initialValues,
          institutionId: initialValues.institutionId?._id || initialValues.institutionId
        } : {
          name: "",
          institutionId: undefined,
          latitude: '',
          longitude: '',
          ssid: '',
          ipAddress: '',
          radius: ''
        }}
      >
        <Form.Item
          name="institutionId"
          label={<span style={{ fontWeight: "bold" }}>Select Institution</span>}
          rules={[
            { required: true, message: 'Please select an institution!' }
          ]}
        >
          <Select
            placeholder="Select Institution"
            size="large"
            disabled={loading}
            loading={!institutionData}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {institutionData?.data?.data?.map((institution) => (
              <Select.Option
                key={institution._id}
                value={institution._id}
              >
                {institution.institutionName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label={<span style={{ fontWeight: "bold" }}>Location Name</span>}
          rules={[
            { required: true, message: 'Please input location name!' },
            { min: 2, message: 'Location name must be at least 2 characters!' }
          ]}
        >
          <Input
            placeholder="Enter location name"
            size="large"
            disabled={loading}
          />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="latitude"
            label={<span style={{ fontWeight: "bold" }}>Latitude</span>}
            rules={latitudeRules}
            style={{ flex: 1 }}
          >
            <InputNumber
              placeholder="21.3630"
              size="large"
              style={{ width: '100%' }}
              step={0.000001}
              precision={6}
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="longitude"
            label={<span style={{ fontWeight: "bold" }}>Longitude</span>}
            rules={longitudeRules}
            style={{ flex: 1 }}
          >
            <InputNumber
              placeholder="92.7958"
              size="large"
              style={{ width: '100%' }}
              step={0.000001}
              precision={6}
              disabled={loading}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="ssid"
          label={<span style={{ fontWeight: "bold" }}>Wi-Fi SSID</span>}
          rules={[
            { required: true, message: 'Please input Wi-Fi SSID!' },
            { min: 1, max: 32, message: 'SSID must be between 1 and 32 characters!' }
          ]}
        >
          <Input
            placeholder="BD-Calling-WiFi"
            size="large"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="ipAddress"
          label={<span style={{ fontWeight: "bold" }}>Wi-Fi IP Address</span>}
          rules={ipAddressRules}
        >
          <Input
            placeholder="192.168.11.6"
            size="large"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="radius"
          label={<span style={{ fontWeight: "bold" }}>Radius (meters)</span>}
          rules={radiusRules}
        >
          <InputNumber
            type='number'
            placeholder="100"
            size="large"
            style={{ width: '100%' }}
            min={1}
            max={10000}
            disabled={loading}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LocationModal;