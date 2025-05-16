import { Button, Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import { Upload as UploadIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const { Option } = Select;

const InstitutionFormModal = ({
  mode = 'create', // 'create' or 'edit'
  visible,
  onCancel,
  onSubmit,
  initialValues = {}
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Set form values when mode changes or initialValues update
  useEffect(() => {
    if (mode === 'edit' && visible) {
      form.setFieldsValue({
        ...initialValues,
        // Ensure geofencingLocation is undefined if empty
        geofencingLocation: initialValues.geofencingLocation || undefined
      });
    } else if (mode === 'create' && visible) {
      form.setFieldsValue({
        name: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        establishedYear: "",
        geofencingLocation: undefined // This ensures placeholder shows
      });
      setFileList([]);
    }
  }, [mode, visible, initialValues, form]);

  // Handle file upload
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      if (mode === 'create') {
        form.resetFields();
        setFileList([]);
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  // Custom footer with centered buttons
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
    ? 'Create New Institution'
    : 'Edit Institution';

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#336C79", paddingTop: "20px", paddbottom: "20px", fontSize: "20px" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={false}
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Institution Name"
              rules={[{ required: true, message: 'Please input institution name!' }]}
            >
              <Input placeholder="Enter institution name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input address!' }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input phone number!' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="website"
              label="Institution Website Link"
              rules={[{ required: true, message: 'Please input website!' }]}
            >
              <Input placeholder="Enter website link" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="establishedYear"
              label="Established Year"
              rules={[{ required: true, message: 'Please input established year!' }]}
            >
              <Input placeholder="Enter year" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="geofencingLocation"
              label="Choose Geofencing Location"
              rules={[{ required: true, message: 'Please select location!' }]}
            >
              <Select placeholder="Select a location">
                <Option value="Brookwood Baptist Health">Brookwood Baptist Health</Option>
                <Option value="St. Vincent's Hospital">St. Vincent`s Hospital</Option>
                <Option value="UAB Hospital">UAB Hospital</Option>
                <Option value="Princeton Baptist Medical Center">Princeton Baptist Medical Center</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="logo"
              label="Upload Logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                {...uploadProps}
                listType="picture-card"
                maxCount={5}
                className="institution-logo-uploader"
              >
                <div>
                  <UploadIcon size={24} className="text-gray-400 ml-2" />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default InstitutionFormModal;