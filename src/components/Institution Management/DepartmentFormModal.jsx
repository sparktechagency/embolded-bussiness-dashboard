import { Button, Form, Input, Modal, Select, Spin } from 'antd';
import { useEffect } from 'react';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';

const { Option } = Select;

const DepartmentFormModal = ({
  mode = 'create', // 'create' or 'edit'
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  dataLoading,
  updateLoading
}) => {
  const [form] = Form.useForm();
  const { data: instituteData, isLoading } = useGetAllInstitutionsQuery();

  // Set form values when mode changes or initialValues update
  useEffect(() => {
    if (mode === 'edit' && visible) {
      form.setFieldsValue({
        departmentName: initialValues.departmentName,
        institution: initialValues.institutionID?._id
      });
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
        loading={updateLoading}
        style={{ paddingLeft: "40px", paddingRight: "40px", fontSize: "16px" }}
        onClick={handleSubmit}
        className="bg-[#336C79]"
      >
        {mode === 'create' ? 'Create' : 'Update'}
      </Button>
    </div>
  );

  const modalTitle = mode === 'create'
    ? 'Create New Department'
    : 'Edit Department';

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#336C79", paddingTop: "20px", paddbottom: "20px" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={modalFooter}
      closable={false}
    >
      {
        dataLoading ? <div className='flex items-center justify-center h-[100px]'><Spin size='small' /></div> : (
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="departmentName"
              label={<span style={{ fontWeight: "bold" }}>Department Name</span>}
              rules={[{ required: true, message: 'Please input department name!' }]}
            >
              <Input placeholder="Enter department name" />
            </Form.Item>

            <Form.Item
              name="institution"
              label={<span style={{ fontWeight: "bold" }}>Institution</span>}
            >
              <Select
                placeholder="Select an institution"
                disabled={mode === 'edit'}
              >
                {instituteData?.data?.data.map(institution => (
                  <Option key={institution._id} value={institution._id}>
                    {institution.institutionName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};

export default DepartmentFormModal;