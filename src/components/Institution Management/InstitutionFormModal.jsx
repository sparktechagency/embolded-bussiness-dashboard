import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd';
import { Upload as UploadIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { baseURL } from '../../utils/BaseURL';

const InstitutionFormModal = ({
  mode = 'create',
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  loading
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Separate effect for handling modal opening
  useEffect(() => {
    if (visible && mode === 'create') {
      // For create mode, ensure clean form when opening
      form.resetFields();
      setFileList([]);
    }
  }, [visible, mode]);

  // Separate effect for handling edit mode data
  useEffect(() => {
    if (visible && mode === 'edit' && initialValues && Object.keys(initialValues).length > 0) {
      const timer = setTimeout(() => {
        const values = {
          name: initialValues.institutionName,
          address: initialValues.address,
          email: initialValues.email,
          phone: initialValues.phoneNumber,
          website: initialValues.institutionWebsiteLink,
          establishedYear: initialValues.establishedYear,
        };

        form.setFieldsValue(values);

        if (initialValues.logo) {
          const logoUrl = initialValues.logo.startsWith('http')
            ? initialValues.logo
            : `${baseURL}${initialValues.logo}`;

          const existingFile = {
            uid: '-1',
            name: 'existing-logo.jpg',
            status: 'done',
            url: logoUrl,
            thumbUrl: logoUrl
          };

          setFileList([existingFile]);
          form.setFieldsValue({
            ...values,
            logo: [existingFile]
          });
        } else {
          setFileList([]);
        }
      }, 150); // Slightly longer delay

      return () => clearTimeout(timer);
    }
  }, [visible, mode, initialValues]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
    });
  };

  const handleCancel = () => {
    // Always reset when canceling
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
      // Clear the form field when removing
      form.setFieldsValue({ logo: [] });
    },
    beforeUpload: (file) => {
      const newFileList = [{
        uid: file.uid,
        name: file.name,
        status: 'uploading',
        originFileObj: file
      }];
      setFileList(newFileList);
      return false; // Prevent automatic upload
    },
    fileList,
    listType: "picture-card",
    onPreview: async (file) => {
      let src = file.url || file.thumbUrl;
      if (!src && file.originFileObj) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    }
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
        loading={loading}
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
      title={<span style={{ fontWeight: "bold", color: "#336C79", paddingTop: "20px", fontSize: "20px" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={false}
      width={1000}
    >
      <Form form={form} layout="vertical">
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
                maxCount={1}
                className="institution-logo-uploader"
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <UploadIcon size={24} className="text-gray-400 ml-2" />
                    <div className="mt-2">Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default InstitutionFormModal;